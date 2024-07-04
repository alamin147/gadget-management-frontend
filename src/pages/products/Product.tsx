import { useForm } from "react-hook-form";
import { useAddToCartMutation } from "../../redux/api/api";

const Product = ({ gadget }: any) => {
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const {
    _id,
    product_name,
    product_img,
    price,
    quantity,
    brand,
    model_number,
    existsInCart,

  } = gadget;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // const [ids,setIdss]= useState("")
  const handleForm = (data: any) => {
    const cartSingleData = JSON.parse(
      localStorage.getItem("cartSingleData") as any
    );

    (document.getElementById("my_modal_1") as any).close();
    addToCart({ quantity: Number(data?.quantity), cartSingleData });
    reset();
  };
  const openModal = (modalData: any) => {
    // console.log(modalData);
    (document.getElementById("my_modal_1") as any).showModal();
    // Set default values for the form fields
    // setValue("quantity1", "");
    // JSON.parse(modalData)
    localStorage.setItem("cartSingleData", JSON.stringify(modalData));
  };
// console.log(gadget)
  return (
    <>
      {isLoading && (
        <div className="toast toast-middle toast-center z-[123]">
          <div className="alert alert-success">
            <span>Loading...</span>
          </div>
        </div>
      )}
      <div className="justify-center mx-auto card card-compact w-80 md:w-72 lg:w-80 bg-base-100 shadow-xl">
        <figure>
          <img className="h-80 md:h-72 lg:h-80 image-full" src={product_img} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product_name}</h2>

          <p>Price: ${price}</p>
          <p>Available Quantity: {quantity}</p>
          <p>Model: {model_number}</p>
          <p>Brand: {brand}</p>

          <div className="card-actions justify-center">
            {existsInCart ? (
              <button className="btn btn-primary px-8" disabled>
                In cart
              </button>
            ) : (
              <button
                onClick={() => {
                  openModal({
                    itemId: _id,
                    itemImg: product_img,
                    itemName: product_name,
                    price,
                  });
                }}
                className="btn btn-primary px-8"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal text-center">
        <div className="modal-box">
          <form action="" onSubmit={handleSubmit(handleForm)}>
            <input
              className="input input-bordered  w-full max-w-xs mt-6"
              {...register("quantity", { required: "Quantity is required" })}
              type="text"
              placeholder="Your Quantity"
            />
            {errors.quantity && (
              <p className="text-red-600">
                {errors.quantity?.message as string}
              </p>
            )}
            <br />
            <input
              className="btn w-full max-w-xs mt-6"
              value="Add to cart"
              type="submit"
            />
          </form>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
export default Product;
