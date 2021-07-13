# Donut Panel

![img.png](https://github.com/IntegrationMatters/integrationmatters-donut-panel/blob/master/src/assets/images/screenshot.png?raw=true)

The donut panel displays the ratio of all query results to each other.

## Required queries and query names

Query name | query
--- | ---
**[A-Z]** | increase(application_flows_state_total{status="success"}[${__range}])
**[A-Z]** | increase(application_flows_state_total{status="timeout"}[${__range}])

Allow query names are letters from A to Z. 

