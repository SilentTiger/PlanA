# PlanA


## Redis Keys

|key|type|expire|struct|case
----|----|------|-------|----
tokens:{tid}|hash|60|```{tid:string, uid:string, phone:string, capture:number}```
users:{uid}|hash|0|m_user|
rooms:{rid}|hash|0|m_room|
servers:{sid}|hash|0|```{sid:string, ip:string, port:number, pid:number, actived:boolean, l_conn:number, time:number}```|

> m_user, m_room are data models