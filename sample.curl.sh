#!/bin/sh

# average 13s
curl --location --request GET 'http://localhost:4000/api/v1/deliveries/deliveryLookup?dateFrom=2021-05-15&dateTo=2021-05-21&weight=60000&limit=2&page=1'
# curl --location --request GET 'http://localhost:4000/api/v1/deliveries/deliveryLookup?dateFrom=2021-05-15&dateTo=2021-05-21&weight=60000&limit=2&page=2'

