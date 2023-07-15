# BPP-Boilerplate-SDK
This is an open-source generic SDK that allows any beckn-enabled provider application to be built quickly

# Workflow Details
The workflow below shows a transit service example on beckn protocol.

![image8](https://github.com/Sarfraz-droid/BPP-Boilerplate-SDK/assets/73013838/03b67b4d-8dd7-4b53-80ee-b68fc72390c5)

# API Details
## Search API
The search API looks for endpoints across the registry for available services according to the given configuration.

It consists of the following APIs : 
- /search
- /on_search

![search](https://github.com/Sarfraz-droid/BPP-Boilerplate-SDK/assets/73013838/4d3b14d2-9c7a-41da-83a8-9ef549b7d3c0)
-

## Select API
The Select API selects the items from the catalogue to create the order.

It consists of: 
- /select
- /on_select
![select](https://github.com/Sarfraz-droid/BPP-Boilerplate-SDK/assets/73013838/aae20028-9797-4856-8bf5-82e225a2bad8)

---

## Init API
The Init API initialises the order by providing billing and details.

It consists of: 
- /init
- /on_init
![init](https://github.com/Sarfraz-droid/BPP-Boilerplate-SDK/assets/73013838/bfa51689-6c55-40c7-b282-2a17c13e70aa)

---

## Confirm API
Confirms an order by agreeing to the terms of the order.
This consists of:
- /confirm
- /on_confirm

![confirm](https://github.com/Sarfraz-droid/BPP-Boilerplate-SDK/assets/73013838/148dfe9e-f77f-4e36-a2b7-16e192b4a244)

---
