import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getRazorpayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";
import { toast } from "react-hot-toast";
import HomeLayout from "../../Layouts/HomeLayout";
import { BiRupee } from "react-icons/bi";

/* ================= RAZORPAY SDK LOADER ================= */
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );
  const userData = useSelector((state) => state?.auth?.data || {});

  // ✅ PREVENT DOUBLE API CALLS (CRITICAL)
  const hasLoaded = useRef(false);

  /* ================= LOAD KEYS + SUBSCRIPTION ================= */
  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    (async () => {
      await dispatch(getRazorpayId());
      await dispatch(purchaseCourseBundle());
    })();
  }, [dispatch]);

  /* ================= HANDLE PAYMENT ================= */
  async function handleSubscription(e) {
    e.preventDefault();

    // 🔒 HARD VALIDATION
    if (!razorpayKey) {
      toast.error("Payment key not loaded");
      return;
    }

    if (
      !subscription_id ||
      typeof subscription_id !== "string" ||
      !subscription_id.startsWith("sub_")
    ) {
      toast.error("Invalid subscription. Please refresh and try again.");
      return;
    }

    const sdkLoaded = await loadRazorpayScript();
    if (!sdkLoaded) {
      toast.error("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: razorpayKey,
      subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Annual Subscription",
      theme: {
        color: "#FACC15",
      },
      prefill: {
        email: userData?.email || "",
        name: userData?.fullName || "",
      },
      handler: async function (response) {
        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_subscription_id:
            response.razorpay_subscription_id,
          razorpay_signature: response.razorpay_signature,
        };

        toast.success("Payment Successful");

        const res = await dispatch(
          verifyUserPayment(paymentDetails)
        );

        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  }

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-t-lg">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available
              courses on our platform for
              <span className="text-yellow-500 font-bold block">
                1 Year duration
              </span>
              including all future courses.
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499</span> Only
            </p>

            <div className="text-gray-300 text-sm">
              <p>100% refund on cancellation</p>
              <p>* Terms & Conditions apply *</p>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-b-lg py-3"
            >
              Buy Now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
