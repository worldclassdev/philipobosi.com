---
title: Understanding and implementing rate limiting in Node JS
date: "2020-05-20"
description: "Hello World"
permalink: "node-rate-limiting"
author: worldclassdev
---

## Introduction

Rate limiting is a very powerful feature for securing backend APIs from malicious attack as well as for handling unwanted streams of requests from users. In general terms, it allows us to control the rate at which user requests are processed by our server.

In this article, we will examine the different approaches to implementing rate limiting in theory, as well as the pros and cons of each. We will also get practical by implementing a selected approach, i.e., the most optimal for our use case in Node.js.

## Prerequisites

In order to follow along effectively as you read through this article, you are expected to have the following:

- A general understanding of how servers handle requests
- A good understanding of how to build REST APIs in Node
- Some experience working with middleware in Node

If you’re lacking some or all of these, do not feel intimidated. We will make sure to break things down as much as possible so that you can easily understand every concept we end up exploring.

## What really is rate limiting, and why should I care? 🤔

Rate limiting is a technique used to control the amount of incoming or outgoing traffic within a network. In this context, network refers to the line of communication between a client (e.g., web browser) and our server (e.g., API). Thus, it is a technique that allows us to handle user requests based on some specified constraint such that:

- There is better flow of data
- There is a reduced risk of attack, i.e., improved security
- The server is never overloaded
- Users can only do as much as is allowed by the developer

For example, we might want to limit the number of requests an unsubscribed user can make to a public API to 1,000 requests per month. Once the user exceeds that number, we can ignore the request and throw an error indicating that the user has exceeded their limit.

Bear in mind that in order that for rate limiting to be implemented, there must be a clearly defined constraint (limit), which could be based on any of the following:

- **Users:** Here the constraint is specific to a user and is implemented using a unique user identifier
- **Location:** Here the constraint is based on geography and is implemented based on the location from which the request was made
- **IP addresses:** Here the constraint is based on the IP address of the device that initiates a request

Let us now consider various rate limiting algorithms as well as their pros and cons.

## Examining rate limiting algorithms (theory) 🧠

As with most engineering problems, there are different algorithms for implementing rate limiting, each with its pros and cons. We will now examine five well-known techniques and determine when they are most efficient and when we should look for another solution.

**Fixed sindow counter**
This is probably the most obvious approach to implementing rate limiting. In this approach, track the number of requests a user makes in each window.

Window in this context refers to the space of time under consideration. That is, if I want my API to allow 10 requests per minute, we have a 60-second window. So, starting at `00:00:00`, one window will be `00:00:00` to `00:01:00`.

Thus, for the first request a user makes in the minute, using an optimized key-value store like a HashMap or Redis, we can store the user’s ID against a count, now `1` since this is the first request. See the format below:

![](https://paper-attachments.dropbox.com/s_D46F49AD1F417E8435E14FB1DBBC843B35FBBDD20054BE9D1C71A002636904E9_1581894872681_image.png)

On subsequent requests within the same window, we check to see that the user has not exceeded the limit (i.e., count is not greater than 10). If the user hasn’t, we increment the count by one; otherwise, the request is dropped and an error triggered.

At the end of the window, we reset every user’s record to count `0` and repeat the process for the current window.

✅ **The pros** 

- This approach is relatively easy to implement.

❌ **The cons**

- This approach isn’t entirely accurate, as it is unfair to impose a general window start time on all users. In reality, a user’s window should start counting from the time of their first request to 60 seconds later, in this case.
- When there is a burst traffic towards the end of a window, e.g., at the 55th second, the server ends up doing way more work than is planned per minute. For example, we may have 10 requests from a user between 55 to 60 seconds, and another 10 from the same user in the next window between 0 to 5 seconds. Thus, the server ends up processing 20 requests in 10 seconds for this user.
- In especially larger window cycles — e.g., 50 requests per hour (3,600 seconds) — the user may end up waiting for a very long time if they reach the limit in the first 10 minutes (600 seconds). That means it takes the user 10 minutes to make 50 requests, but one hour to make 51. This may result in a stampeding of the API immediately after a new window opens up.

**Sliding logs** 
The sliding logs algorithm keeps track of the timestamp for each request a user makes. Requests here can be logged using a HashMap or Redis. In both cases, the requests may be sorted according to time in order to improve operations.

The process of logging the requests is illustrated below:

- Retrieve all requests logged in the last window (60 seconds) and check if the number of requests exceeds the allowed limit
- If the number of requests is less than the limit, log the request and process it
- If the number of requests is equal to the limit, drop the request

✅ **The pros**

- This approach is more accurate as it calculates the last window per user based on the user’s activity and does not impose a fixed window for all users.
- It is unaffected by a surge of requests towards the end of the window since there is no fixed window.

❌ **The cons** 

- It is not memory-efficient because we end up storing a new entry for every request made.
- It is also quite expensive to compute as each request will trigger a calculation on previously saved requests to retrieve the logs from the last minute and then get the count.

**Sliding window counter** 
This approach attempts to optimize some of the inefficiencies of both the fixed window counter and sliding logs technique. In this technique, the user’s requests are grouped by timestamp, and rather than log each request, we keep a counter for each group.

It keeps track of each user’s request count while grouping them by fixed time windows(usually a fraction of the limit’s window size). Here’s how it works.

When a user’s request is received, we check whether the user’s record already exists and whether there is already an entry for that timestamp. If both cases are true, we simply increment the counter on the timestamp.

In determining whether the user has exceeded their limit, we retrieve all groups created in the last window, and then sum the counters on them. If the sum equals the limit, then the user has reached their limit and the incoming request is dropped. Otherwise, the timestamp is inserted or updated and the request processed.

As an addition, the timestamp groups can be set to expire after the window time is exhausted in order to control the rate at which memory is consumed.

✅ **The pros**

- This approach saves more memory because instead of creating a new entry for every request, we group requests by timestamp and increment the counter.

**Token bucket**
In the token bucket algorithm, we simply keep a counter indicating how many tokens a user has left and a timestamp showing when it was last updated. This concept originates from packet-switched computer networks and telecomm networks in which there is a fixed-capacity bucket to hold tokens that are added at a fixed rate (window interval).

When the packet is tested for conformity, the bucket is checked to see whether it contains a sufficient number of tokens as required. If it does, the appropriate number of tokens are removed, and the packet passes for transmission; otherwise, it is handled differently.

In our case, when the first request is received, we log the timestamp and then create a new bucket of tokens for the user:

![](https://paper-attachments.dropbox.com/s_D46F49AD1F417E8435E14FB1DBBC843B35FBBDD20054BE9D1C71A002636904E9_1581284386819_image.png)

On subsequent requests, we test whether the window has elapsed since the last timestamp was created. If it hasn’t, we check whether the bucket still contains tokens for that particular window. If it does, we will decrement the tokens by `1` and continue to process the request; otherwise, the request is dropped and an error triggered.

In a situation where the window has elapsed since the last timestamp, we update the timestamp to that of the current request and reset the number of tokens to the allowed limit.

✅ **The pros**

- This is an accurate approach as the window is not fixed across users and, as such, is determined based on a user’s activity.
- Memory consumption is minimal since you only have one entry per user, which is used to manage their activity (timestamp and available tokens) over time.

**Leaky bucket**
The leaky bucket algorithm makes use of a queue that accepts and processes requests in a first-in, first-out (FIFO) manner. The limit is enforced on the queue size, i.e., if the limit is 10 requests per minute, then the queue would only be able to hold 10 requests per time.

As requests get queued up, they are processed at a relatively constant rate. This means that even when the server is hit with a burst of traffic, the outgoing responses are still sent out at the same rate.

Once the queue is filled up, the server will drop any more incoming requests until space is freed up for more.

✅ **The pros**

- This technique smooths out traffic, thus preventing server overload.

❌ **The cons**

- Traffic shaping may result in a perceived overall slowness for users since requests are being throttled thus affecting your application’s user experience.

## CodeLab (Code implementation) 👨‍💻

Now that we have explored rate limiting from a theoretical perspective, it is time for us to get practical. Below, we have identified certain scenarios in which a rate limiting algorithm is required to achieve the expected outcome. Take your time to go through them and, in each case, try to identify what algorithm you are inclined to use and why.

1. A fintech company trying to implement a daily transaction value per user capped at \$5,000.
2. Implementing checks on a public books API to ensure that each user can only perform 100 API requests per day (24 hours).

In this tutorial, we will be implementing scenario two in Node.js. However, now we need to decide on what algorithm is most appropriate for our use case.

> If you are feeling up to the challenge, feel free to download the [tutorial boilerplate here](https://github.com/worldclassdev/node-rate-limiter/tree/boilerplate) and try to implement any of the algorithms yourself.

## Algorithmic thinking

What algorithm do we stick with for our use case? As explained above, the fixed window counter and sliding logs are the most inefficient ways to implement rate limiting. That leaves us with sliding window counter, leaky bucket, and token bucket. The leaky bucket algorithm is most applicable in scenarios where, along with rate limiting, we are trying to do some traffic shaping.

> Traffic shaping (also known as packet shaping) is a bandwidth management technique that delays the flow of certain types of network packets in order to ensure network performance for higher-priority applications. In this context, it describes the ability to manage server resources to process and respond to requests at a certain rate, no matter the amount of traffic it receives.

As that is not a major concern in this case, that leaves us with sliding window counter and token bucket algorithm. Either approach will work just fine, but for the sake of this article, we will go with the sliding window counter.

We will use this algorithm to keep track of each user’s request count per day (24 hours) while grouping them by a fixed one-hour window.

Now, let’s get started!

## Project setup

To get started, [clone this repository](https://github.com/worldclassdev/node-rate-limiter/tree/boilerplate) on your computer, navigate into the project directory on your terminal, and install the project’s dependencies using the command below:

```bash
    npm i
```
The boilerplate code contains a simple API that allows us retrieve a list of books using a `GET` request to the `/books` endpoint. Therefore, we will be implementing rate limiting using a middleware layer which will enforce the limits for each user.

All the code for the API lives within the `src` directory. There is no user authentication in this case, therefore we will identify users using their IP addresses. This is available as a property on the request object for every request made i.e `req.ip`.

Finally, rename the `.env.example` file to `.env` as it contains the project’s environment variables. You can now start the server by running the command below:

```bash
    npm run dev
```

To the codeground!

## Implementing the rate limiter

We will implement our sliding window counter rate limiter algorithm in two ways. In the first, we will use a third-party library, [express-rate-limit](https://www.npmjs.com/package/express-rate-limit), and in the other, we will be doing a custom implementation.

**Using a third\*\***-\***\*party library**
express-rate-limit is an npm package commonly used as a basic rate limiting middleware for Node. To make use of this plugin, we will have to install it first. Run the command below from your terminal, within the project directory, to do so:

```bash
    npm i express-rate-limit --save
```
Next, proceed to the `middlewares` folder within the project and create a file named `rateLimiter.js`. This is where we will be writing the rate limiting middleware for our API.

Copy and paste the following code inside this file:

```javascript
    // src/middlewares/rateLimiter.js

    import rateLimit from 'express-rate-limit';

    export const rateLimiterUsingThirdParty = rateLimit({
      windowMs: 24 * 60 * 60 * 1000, // 24 hrs in millseconds
      max: 100,
      message: 'You have exceeded the 100 requests in 24 hrs limit!',
      headers: true,
    });
```
In the code snippet above, we imported the npm package into the project. Using the package, we create a middleware that enforces rate limiting based on the options we have passed in, i.e.:

- `windowMs` – This is the window size (24 hours in our case) in milliseconds
- `max` \*\*\*\*– This represents the number of allowed requests per window per user
- `message` \*\*\*\*– This specifies the response message users get when they have exceed the allowed limit
- `headers` – This specifies whether the appropriate headers should be added to the response showing the enforced limit (`X-RateLimit-Limit`), current usage (`X-RateLimit-Remaining`), and time to wait before retrying (`Retry-After`) when the limit is reached

Now that we have created the middleware, we need to configure our application to use this middleware when handling requests.

First, export the middleware from our middleware module by updating the `index.js` file in the `middlewares` folder as shown below:

```javascript
    // src/middlewares/index.js
    export { default as errorHandler } from './errorHandler';
    export { rateLimiterUsingThirdParty } from './rateLimiter';
```

Next, import the `rateLimiterUsingThirdParty` middleware and apply it to all application routes:
```javascript

    // src/index.js
    // ...Some code here

    import { rateLimiterUsingThirdParty } from './middlewares';

    // ...Some code here

    app.use(rateLimiterUsingThirdParty);

    // ...Some more code goes here
```

Voilà! We are done. Notice that we didn’t have to specify the identifier for each user manually. If you go through the docs for this package, [as found here on](https://www.npmjs.com/package/express-rate-limit) [npm](https://www.npmjs.com/package/express-rate-limit), you would notice that this package identifies users by their IP addresses using `req.ip` by default.

Pretty straightforward, right? Now let’s try a slightly more complex approach.

**A custom implementation (using an express middleware and Redis)**
For this implementation, we will be making use of [Redis](https://redis.io/) to keep track of each user’s request count and timestamp using their IP addresses. If you do not have Redis installed on your machine, follow [the instructions here](https://redis.io/download) to do so.

Using the command below, install the following packages which allow us to connect to Redis and manipulate time easily within our application.

```bash
    npm i redis moment --save
```
Next, update your `rateLimiter.js`, file as shown below. The code below is a middleware that handles rate limiting for our API using Redis.

Copy and paste it inside `rateLimiter.js`.

```javascript
    import moment from 'moment';
    import redis from 'redis';

    const redisClient = redis.createClient();
    const WINDOW_SIZE_IN_HOURS = 24;
    const MAX_WINDOW_REQUEST_COUNT = 100;
    const WINDOW_LOG_INTERVAL_IN_HOURS = 1;


    export const customRedisRateLimiter = (req, res, next) => {
      try {
        // check that redis client exists
        if (!redisClient) {
          throw new Error('Redis client does not exist!');
          process.exit(1);
        }
        // fetch records of current user using IP address, returns null when no record is found
        redisClient.get(req.ip, function(err, record) {
          if (err) throw err;
          const currentRequestTime = moment();
          console.log(record);
          //  if no record is found , create a new record for user and store to redis
          if (record == null) {
            let newRecord = [];
            let requestLog = {
              requestTimeStamp: currentRequestTime.unix(),
              requestCount: 1
            };
            newRecord.push(requestLog);
            redisClient.set(req.ip, JSON.stringify(newRecord));
            next();
          }
          // if record is found, parse it's value and calculate number of requests users has made wirhin the last window
          let data = JSON.parse(record);
          let windowStartTimestamp = moment()
            .subtract(WINDOW_SIZE_IN_HOURS, 'hours')
            .unix();
          let requestsWithinWindow = data.filter(entry => {
            return entry.requestTimeStamp > windowStartTimestamp;
          });
          console.log('requestsWithinWindow', requestsWithinWindow);
          let totalWindowRequestsCount = requestsWithinWindow.reduce((accumulator, entry) => {
            return accumulator + entry.requestCount;
          }, 0);
          // if number of requests made is greater than or equal to the desired maximum, return error
          if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
            res
              .status(429)
              .jsend.error(
                `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_HOURS} hrs limit!`
              );
          } else {
            // if number of requests made is lesser than allowed maximum, log new entry
            let lastRequestLog = data[data.length - 1];
            let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
              .subtract(WINDOW_LOG_INTERVAL_IN_HOURS, 'hours')
              .unix();
            //  if interval has not passed since last request log, increment counter
            if (lastRequestLog.requestTimeStamp > potentialCurrentWindowIntervalStartTimeStamp) {
              lastRequestLog.requestCount++;
              data[data.length - 1] = lastRequestLog;
            } else {
              //  if interval has passed, log new entry for current user and timestamp
              data.push({
                requestTimeStamp: currentRequestTime.unix(),
                requestCount: 1
              });
            }
            redisClient.set(req.ip, JSON.stringify(data));
            next();
          }
        });
      } catch (error) {
        next(error);
      }
    };
```

There’s quite a lot going on here, so let’s do a step-by-step walkthrough:

We installed and imported Redis and Moment.js from npm and initialized all useful constants. We use Redis as an in-memory storage for keeping track of user activity, while [Moment](https://momentjs.com/docs/) helps us accurately parse, validate, manipulate, and display dates and times in JavaScript.

Next, we create a middleware, `customRedisRateLimiter`, within which we are to implement the rate limiting logic. Inside the middleware function’s `try` block, we check that the Redis client exists and throw an error if it doesn’t.

Using the user’s IP address `req.ip`, we fetch the user’s record from Redis. If `null` is returned, this indicates that no record has been created yet for the user in question. Thus, we create a new record for this user and store it to Redis by calling the `set()` method on the Redis client.

If a record was found, the value is returned. Thus, we parse that value to JSON and proceed to calculate if the user is eligible to get a response. In order to determine this, we calculate the cumulative sum of requests made by the user in the last window by retrieving all logs with timestamps that are within the last 24 hours and sum their corresponding `requestCount`.

If the number of requests in the last window — i.e., `totalWindowRequestsCount` — is equal to the permitted maximum, we send a response to the user with a constructed error message indicating that the user has exceeded their limit.

However, if `totalWindowRequestsCount` is less than the permitted limit, the request is eligible for a response. Thus, we perform some checks to see whether it’s been up to one hour since the last log was made. If it has been up to one hour, we create a new log for the current timestamp. Otherwise, we increment the `requestCount` on the last timestamp and store (update) the user’s record on Redis.

Make sure to export and apply the middleware to our Express app as we did in the third-party library implementation.

Whew! That’s it. Does this work as desired?

Let’s see!

## Testing

When you test our API from [Postman](https://www.postman.com/downloads/), you get the following response:

```bash
    localhost:8080/books
```

![](https://paper-attachments.dropbox.com/s_D46F49AD1F417E8435E14FB1DBBC843B35FBBDD20054BE9D1C71A002636904E9_1581892317928_image.png)

When you have exceeded the permitted limit (i.e., 100 requests per hour), the server returns the message below:

![](https://paper-attachments.dropbox.com/s_D46F49AD1F417E8435E14FB1DBBC843B35FBBDD20054BE9D1C71A002636904E9_1581892211953_image.png)

We made it! 🎊

We have now come to the end of this tutorial.🤗

## Conclusion

In this article, we have successfully explored the concept of rate limiting — what it is, how it works, various ways to implement it, and practical scenarios in which it is applicable.

We have also done our very own implementation in Node.js, first using a simple third-party library that handles all the heavy lifting for us, then a custom implementation using Redis. I hope you enjoyed doing this with me.

You may find the source code for [this tutorial here on GitHub](https://github.com/worldclassdev/node-rate-limiter).

**See you in the next one!✌🏿**
