'use strict';

let SubnetMask = {

    /**
     * 根据 IP 和掩码位获取网络和 IP 地址信息
     * @param {string} ip ip地址
     * @param {number} maskBit 掩码位 (0 - 32)
     * @returns
     */
    networkAndIpCalculator: (ip, maskBit) => {
        if (maskBit === +maskBit && 0 <= maskBit && maskBit <= 32) {
            let ipCheck = this.isIP(ip);
            if (ipCheck) {
                let ipArray = ip.split( '.' );
                let ipNum = ( ( ( ( ( ( +ipArray[ 0 ] ) * 256 ) + ( +ipArray[ 1 ] ) ) * 256 ) + ( +ipArray[ 2 ] ) ) * 256 ) + ( +ipArray[ 3 ] );
                let mask = this.getMask(maskBit);
                let network = this.toIpString(( ipNum & maskBit ) >>> 0);
                let lowMask = this.getMask( 32 - maskBit );
                let broadcast = this.toIpString(( ( ( ipNum & maskBit ) >>> 0 ) + lowMask ) >>> 0);
                let firstAvailable = this.toIpString((( ipNum & maskBit ) >>> 0) - 1);
                let lastAvailable = this.toIpString((( ( ( ipNum & maskBit ) >>> 0 ) + lowMask ) >>> 0) - 1);
                return {
                    success: true,
                    code: '1000',
                    data: {
                        availableIpAmount: '',
                        mask: mask,
                        network: network,
                        firstAvailable: firstAvailable,
                        lastAvailable: lastAvailable,                        
                        broadcast: broadcast
                    },
                    message: 'success'
                }               
            } else {
                return {
                    success: false,
                    code: '1001',
                    data: 'Wrong formatted IP address',
                    message: 'Wrong formatted IP address',
                }
            }
        } else {
            return {
                success: false,
                code: '1002',
                data: 'Wrong formatted Mask bit',
                message: 'Wrong formatted Mask bit',
            }
        }        
    },

    /**
     * 判断是否为 IP 地址
     * @param {string} ip IP地址
     * @returns {boolean} 
     */
    isIP: (ip) => {
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
    toIpString: (ipNum) => {
        var ipStr = ipNum % 256;
		for ( let i = 3; i > 0; i-- ) {
            ipNum = Math.floor( ipNum / 256 );
			ipStr = ipNum % 256 + '.' + ipStr;
        }			
		return ipStr;
    },

    /**
     * 掩码位转换成掩码
     * @param {number} maskBit 
     */
    getMask: (maskBit) => {
        let mask = 0;				
		for ( let i = 0; i < maskBit; i++ ) {
            mask += ( 1 << ( 32 - ( i + 1 ) ) ) >>> 0;
        }			        
		return this.toIpString(mask);
    },

    /**
     * 
     * @param {number} maskBitSize 掩码位(反位)
     */
    getLowMask: (maskBitSize) => {
        var lowMask = 0;			
		for ( let i = 0; i < maskBitSize; i++ ) {
            lowMask += ( 1 << i ) >>> 0;
        }			
		return lowMask;
    }
};

module.exports = SubnetMask;