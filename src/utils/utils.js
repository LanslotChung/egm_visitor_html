function refundTypes(){
    return [{
        key:0,
        value:'等额本息(每月等额还款)'
    },{
        key:1,
        value:'等额本金(每月递减还款)'
    }]
}
function paymentTimes(j){
    let arr = [];
    for(let i=0;i<j;i++){
        arr.push({
            key:i,
            value:`${i+1}年(${(i+1)*12}个月)`,
            num:(i+1)*12
        })
    }
    return arr
}
//num基准利率,j阶梯
function interestRates(num,j){
    let arr = [];
    for(let i=0;i<j+1;i++){
        let k = (1-0.025*j +0.05*i).toFixed(4)-0;
        if(k<1){
            arr.push({
                key:i,
                num:(num*k).toFixed(4)-0,
                value:`${k*10}折(${(num*k).toFixed(4)-0}%)`
            })
        }else if(k == 1){
            arr.push({
                key:i,
                num:num,
                value:`基准利率(${num}%)`
            })
        }else if(k>1){
            arr.push({
                key:i,
                num:(num*k).toFixed(4)-0,
                value:`${k}倍(${(num*k).toFixed(4)-0}%)`
            })
        }
    }
    return arr
}
//计算公式： 每月还本付息金额 =［贷款本金 × 月利率 × （ 1 ＋月利率）＾还款月数］ ÷ ［（ 1 ＋月利率）＾还款月数－ 1 ］  
//本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
function acpi(lilv, total, month){
    let lilv_month = lilv / 12; //月利率
    let mounthPay = total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
    return total==0? 0 : mounthPay
}
//(参数: 年利率/贷款总额/每期还款额/年利率/贷款总额/每期还款额/贷款总月份/每期还款额)
function acpiData(lilv0,total0,mounthPay0,lilv1,total1,mounthPay1,month,mounthPay){
    let arr = [];//本期利息
    for(let i=0;i<month;i++){
        if(i==0){
            arr.push({
                a:mounthPay,//本期还款
                a0:mounthPay0,
                a1:mounthPay1,
                b:mounthPay - total0*lilv0/12-total1*lilv1/12,//本期还本金
                b0:mounthPay0 - total0*lilv0/12,
                b1:mounthPay1 - total1*lilv1/12,
                c:total0*lilv0/12+total1*lilv1/12,//本期利息
                c0:total0*lilv0/12,
                c1:total1*lilv1/12,//本期利息
                d:total0 + total1 - (mounthPay - (total0*lilv0/12+total1*lilv1/12)),//本期剩余
                d0:total0 - (mounthPay0 - total0*lilv0/12),
                d1:total1 - (mounthPay1 - total1*lilv1/12)
            })
        }else{
            arr.push({
                a:mounthPay,//本期还款
                a0:mounthPay0,
                a1:mounthPay1,
                b:mounthPay - arr[i-1].d0*lilv0/12 - arr[i-1].d1*lilv1/12,//本期还本金
                b0:mounthPay0 - arr[i-1].d0*lilv0/12,
                b1:mounthPay1 - arr[i-1].d1*lilv1/12,
                c:arr[i-1].d0*lilv0/12 + arr[i-1].d1*lilv1/12,//本期利息
                c0:arr[i-1].d0*lilv0/12,
                c1:arr[i-1].d1*lilv1/12,
                d:arr[i-1].d0 + arr[i-1].d1 - (mounthPay - (arr[i-1].d0*lilv0/12+arr[i-1].d1*lilv1/12))<0?0:arr[i-1].d0 + arr[i-1].d1 - (mounthPay - (arr[i-1].d0*lilv0/12+arr[i-1].d1*lilv1/12)),//本期剩余
                d0:arr[i-1].d0 - (mounthPay0 - arr[i-1].d0*lilv0/12),
                d1:arr[i-1].d1 - (mounthPay1 - arr[i-1].d1*lilv1/12)
            })
        }
    }
    return arr
}

//计算公式:每月还本付息金额 = (本金/还款月数)+(本金-累计已还本金)*月利率
//本金还款的月还款额(参数: 年利率 / 贷款总额 / 贷款总月份 /已还款月数 )
function averageCapital(lilv, total, month ,cur_month){
    let lilv_month = lilv / 12; //月利率
    let benjin_money = total / month;//每月还款额
    let mounthPay = benjin_money + (total - benjin_money*cur_month)*lilv_month;
    return mounthPay
}
//(参数: 年利率/贷款总额/年利率/贷款总额/贷款总月份)
function averageCapitalData(lilv0,total0,lilv1,total1,month){
    let arr = [];
    for(let i=0;i<month;i++){
        arr.push({
            a:(total0+total1)/month + (total0-total0/month*i)*lilv0/12 + (total1-total1/month*i)*lilv1/12,//本期还款
            a0:total0/month + (total0-total0/month*i)*lilv0/12,
            a1:total1/month + (total1-total1/month*i)*lilv1/12,
            b:(total0+total1)/month,//本期还本金
            b0:total0/month,
            b1:total1/month,
            c:(total0-total0/month*i)*lilv0/12 + (total1-total1/month*i)*lilv1/12,//本期利息
            c0:(total0-total0/month*i)*lilv0/12,
            c1:(total1-total1/month*i)*lilv1/12,
            d:total0 + total1 - total0/month*(i+1) - total1/month*(i+1)<0?0:total0 + total1 - total0/month*(i+1) - total1/month*(i+1),//本期剩余
            d0:total0 - total0/month*(i+1),
            d1:total1 - total1/month*(i+1)
        })
    }
    return arr;
}
module.exports = {
    refundTypes,
    paymentTimes,
    interestRates,
    acpi,
    acpiData,
    averageCapital,
    averageCapitalData
}