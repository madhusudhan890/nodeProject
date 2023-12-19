# nodeProject

mongoDB

TASK : APIs need to withstand 10000 concurrent requests with mongodb read.

APIs created:

    1. http://localhost:3000/data           Method: GET
    2. http://localhost:3000/login-data     Method: GET
    3. http://localhost:3000/cache-data     Method: GET

Description:

Performed 3 different tasks on 3 apis and measured their performance. Here are details.

1.  http://localhost:3000/data (Without input & redis cache)

        Concurrency Level:      10000
        Time taken for tests:   21.169 seconds
        Complete requests:      10000
        Failed requests:        0
        Total transferred:      6220000 bytes
        HTML transferred:       4130000 bytes
        Requests per second:    472.40 [#/sec] (mean)
        Time per request:       21168.573 [ms] (mean)
        Time per request:       2.117 [ms] (mean, across all concurrent requests)
        Transfer rate:          286.95 [Kbytes/sec] received

    This api will fetch everything from users model without using any indexes/redis cluster for cache.

2.  http://localhost:3000/login-data (input & Mongodb Indexing & no redis cache)

        Concurrency Level:      10000
        Time taken for tests:   20.875 seconds
        Complete requests:      10000
        Failed requests:        0
        Total transferred:      3530000 bytes
        HTML transferred:       1450000 bytes
        Requests per second:    479.05 [#/sec] (mean)
        Time per request:       20874.559 [ms] (mean)
        Time per request:       2.087 [ms] (mean, across all concurrent requests)
        Transfer rate:          165.14 [Kbytes/sec] received

    This api will fetch data from database where email and password given as inputs and both are indexed.

3.  http://localhost:3000/cache-data (input & redis cache & Mongodb Indexing)

        Concurrency Level:      10000
        Time taken for tests:   15.115 seconds
        Complete requests:      10000
        Failed requests:        0
        Total transferred:      3550000 bytes
        HTML transferred:       1470000 bytes
        Requests per second:    661.59 [#/sec] (mean)
        Time per request:       15115.000 [ms] (mean)
        Time per request:       1.512 [ms] (mean, across all concurrent requests)
        Transfer rate:          229.36 [Kbytes/sec] received

    This api will check and fetch data from redis where email taken as key if not in redis then data comes from database,email & passowrd given as inputs and both are indexed.

NOTE: Time taken will directly propositional to number of concurrent requests. Higher the concurrent requests ,higher the time limit.

Error Handling:

1. Sending Mail to Admin
   Whenever error occurs either server error or database error , the details of the error will be sent to admin through email.

2. PM2 logs

   At production,if admin needed more details on error,then PM2 logs will give bigger picture of whats happening.

API testing:

    Used ApacheBenchmark is used to test the apis with concurrent reqests of 10000 and more.

Database Level Optimisation:

1. Connection Pool

   Set maxPoolSize to 100, Inorder to send requests with less latency.

2. Indexing

   Indexed required fields like email and password to achieve optimised result.
