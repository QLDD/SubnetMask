'use strict';

let SubnetMask = {

    /**
     * 根据 IP 和掩码位获取网络和 IP 地址信息
     * @param {string} ip ip地址
     * @param {number} maskBit 掩码位 (0 - 32)
     * @returns
     */
    networkAndIpCalculator: function (ip, maskBit) {
        if (maskBit === +maskBit && 0 <= maskBit && maskBit <= 32) {
            let ipCheck = this.isIP(ip);
            if (ipCheck) {
                let ipArray = ip.split( '.' );
                let ipNum = ( ( ( ( ( ( +ipArray[ 0 ] ) * 256 ) + ( +ipArray[ 1 ] ) ) * 256 ) + ( +ipArray[ 2 ] ) ) * 256 ) + ( +ipArray[ 3 ] );
                let maskNum = this.getMaskNumber(maskBit);                                                                
                let network = this.toIpString(( ipNum & maskNum ) >>> 0);
                let lowMask = this.getLowMask( 32 - maskBit );
                let broadcast = this.toIpString(( ( ( ipNum & maskNum ) >>> 0 ) + lowMask ) >>> 0);
                let firstAvailable = network.substring(0, network.lastIndexOf('.')) + '.' + (Number(network.substring(network.lastIndexOf('.') + 1)) + 1);
                let lastAvailable = broadcast.substring(0, broadcast.lastIndexOf('.')) + '.' + (Number(broadcast.substring(broadcast.lastIndexOf('.') + 1)) - 1);
                let availableIpAmount = Number(broadcast.substring(broadcast.lastIndexOf('.') + 1)) - Number(network.substring(network.lastIndexOf('.') + 1)) - 1;
                return {
                    success: true,                    
                    data: {
                        availableIpAmount: availableIpAmount,
                        mask: this.toIpString(maskNum),
                        network: network,
                        firstAvailable: firstAvailable,
                        lastAvailable: lastAvailable,                        
                        broadcast: broadcast
                    }                    
                }               
            } else {
                return {
                    success: false,                                        
                    message: 'Wrong formatted IP address',
                }
            }
        } else {
            return {
                success: false,                                
                message: 'Wrong formatted Mask bit',
            }
        }        
    },

    /**
     * 判断是否为 IP 地址
     * @param {string} ip IP地址
     * @returns {boolean} 
     */
    isIP: function (ip) {
        if (typeof(ip) !== 'string') {
            return false;
        }
        let ipCheck = ip.match(/^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/);
        if (ipCheck === null) {
            return false;
        }
        return true;
    },

    /**
     *      
     * @param {number} ipNum 
     */
    toIpString: function (ipNum) {
        var ipStr = ipNum % 256;
		for ( let i = 3; i > 0; i-- ) {
            ipNum = Math.floor( ipNum / 256 );
			ipStr = ipNum % 256 + '.' + ipStr;
        }			
		return ipStr;
    },

    /**
     * 掩码位转换成掩码数
     * @param {number} maskBit 
     */
    getMaskNumber: function (maskBit) {
        let maskNum = 0;				
		for ( let i = 0; i < maskBit; i++ ) {
            maskNum += ( 1 << ( 32 - ( i + 1 ) ) ) >>> 0;
        }			        
		return maskNum;
    },

    /**
     * 
     * @param {number} maskBitSize 掩码位(反位)
     */
    getLowMask: function (maskBitSize) {
        var lowMask = 0;			
		for ( let i = 0; i < maskBitSize; i++ ) {
            lowMask += ( 1 << i ) >>> 0;
        }			
		return lowMask;
    },

    /**
     * 检测第一个参数ip是否属于第二个参数ip和第三个参数maskBit计算出的ip地址段中
     * @param {*} ip 
     * @param {*} ipCIDR 
     * @param {*} maskBit 
     */
    checkNetworkAndIpCalculator: function (ip, ipCIDR, maskBit) {
        if (!this.isIP(ip)) {
            return false;
        }
        if (!this.isIP(ipCIDR)) {
            return false;
        }
        if (maskBit === +maskBit && 0 <= maskBit && maskBit <= 32) {
            let result = this.networkAndIpCalculator(ipCIDR, maskBit);
            if (!result.success) {
                return false;
            }
            let firstN = +result.data.firstAvailable.substring(result.data.firstAvailable.lastIndexOf('.') + 1);
            let lastN = +result.data.lastAvailable.substring(result.data.lastAvailable.lastIndexOf('.') + 1);
            let ipN = +ip.substring(ip.lastIndexOf('.') + 1);
            if ( firstN <= ipN && ipN <= lastN) {
                return true;
            }
        } else {
            return false;
        }                                
    }

};

module.exports = SubnetMask;

