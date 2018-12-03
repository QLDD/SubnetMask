## SubnetMAsk

### Introduction

- 子网掩码相关方法

### Installation

``` 
npm install subnetmask
```

### Methods

| method                      | param                                   | description                                                  |
| --------------------------- | --------------------------------------- | ------------------------------------------------------------ |
| ipIP()                   | ip(string)                              | 检测是否为ip地址                                             |
| networkAndIpCalculator()      | ip(string)、maskBit(number)             | 根据ip和掩码位，查询网络和ip地址                             |
| checkNetworkAndIpCalculator() | ip(string)、ipCIDR(string)、maskBit(number) | 检测第一个参数ip是否属于第二个参数ip和第三个参数maskBit计算出的ip地址段中 |

### Demo

``` js
const SubnetMask = require('subnetmask');

// 1、检测是否为IP地址
let result = SubnetMask.ipIP('127.0.0.1');
// 返回： 成功 ==> true ; 失败或Error ==> false

// 2、根据IP和掩码位，查网络和IP地址
let data = SubnetMask.networkAndIpCalculator('127.0.0.1', 28);
// 成功：data ==>
// { 
//     success: true,
//     data:{ 
//         availableIpAmount: 14,
//         mask: '255.255.255.240',
//         network: '172.1.1.0',
//         firstAvailable: '172.1.1.1',
//         lastAvailable: '172.1.1.14',
//         broadcast: '172.1.1.15' 
//     },
// }
// 失败： data ==>
// {
//     success: false,
//     message: 'errorInfo'
// }

// 3、检测第一个参数ip是否属于第二个参数ip和第三个参数maskBit计算出的ip地址段中
let rtn = SubnetMask.checkNetworkAndIpCalculator('127.1.1.2', '127.0.0.1', 28);
// 返回： 成功 ==> true ; 失败或Error ==> false

```