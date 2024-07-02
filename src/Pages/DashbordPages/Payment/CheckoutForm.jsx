import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAllUsers from "../../../Hooks/useAllUsers";
import useAuht from "../../../Hooks/useAuht";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [users] = useAllUsers()
    const { user } = useAuht()
    const axiosSecure = useAxiosSecure()

    // member data
    const currentUser = users.find(arry => arry?.email === user?.email)
    console.log(currentUser._id);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            axiosSecure.patch(`/user/member/${currentUser?._id}`)
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch()
                    }
                })
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn bg-blue-200 rounded-md mt-10 px-6" type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;