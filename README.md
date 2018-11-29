## SubnetMAsk

### Introduction

### Installation

``` 
npm install subnetmask
```

### Methods

```
const SubnetMask = require('subnetmask');

// params: IP and Mask
let data = SubnetMask.networkAndIpCalculator('127.0.0.1', 28);
console.log(data);
// { 
//     success: true,
//     code: '1000',
//     data:{ 
//         availableIpAmount: 14,
//         mask: '255.255.255.240',
//         network: '172.1.1.0',
//         firstAvailable: '172.1.1.1',
//         lastAvailable: '172.1.1.14',
//         broadcast: '172.1.1.15' 
//     },
//     message: 'success'
// }
```