 export const formatCurrency = (kobo) => {
    try {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0,
        }).format(kobo/100)
    } catch (error) {
        return `₦${Math.round(kobo/100).toLocaleString()}`
    }
//     const naira = "\u20A6";// this is  naira unicode for javascript
// console.log(naira); // ₦

}