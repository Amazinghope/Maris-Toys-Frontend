 export const formatCurrency = (amount = 0) => {
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }).format(amount)
    } catch (error) {
        return `₦${Math.round(amount).toLocaleString()}`
    }
//     const naira = "\u20A6";// this is  naira unicode for javascript
// console.log(naira); // ₦

}