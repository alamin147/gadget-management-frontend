import { useState } from "react";
import {
  useDeleteAllCartMutation,
  useDeleteCartProductMutation,
  useGetMyCartQuery,
  usePaymentMutation,
} from "../../redux/api/api";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
const Checkout = () => {
  const token = useAppSelector(useCurrentToken);
  let decodedUser: any;
  if (token) {
    decodedUser = verifyToken(token);
    // console.log("decodedToken",decodedUser)
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const { data: itemCartData, isLoading } = useGetMyCartQuery(
    decodedUser?.username
  );
  const [deleteCartProduct] = useDeleteCartProductMutation();
  const [payment, { isLoading: paymentProcessing }] = usePaymentMutation();
  // console.log("cart data", itemCartData);
  const [prevItems, setPrevItems]: any = useState(itemCartData);
  const [loaded, setLoaded] = useState(false);

  if (loaded == false && isLoading == false) {
    setPrevItems(itemCartData?.cart);
    setLoaded(true);
  }
  // console.log(prevItems);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // delete from state

  const handleDeleteFromCart = async (currItemData: any) => {
    setDeleteLoading(true);
    // console.log(currItemData,itemCartData)
    const res = await deleteCartProduct({
      currItemData,
      itemCartData: itemCartData?.cart,
    });
    if (res) {
      setDeleteLoading(false);
      setPrevItems([]);
    }
  };

  const handleUpdateCart = (currentItem: any, updatedQuantity: any) => {
    const foundIndex = prevItems?.findIndex(
      (newItem: any) => newItem.itemId === currentItem.itemId
    );

    if (foundIndex !== -1) {
      const updatedItems: any = [...prevItems];
      updatedItems[foundIndex] = {
        ...updatedItems[foundIndex],
        quantity: updatedQuantity,
      };
      setPrevItems(updatedItems);
    }
  };

  const openModal = () => {
    (document.getElementById("my_modal_1") as any).showModal();
    // Set default values for the form fields
  };
  const [isPaid, setIsPaid] = useState(false);
  const [isPaidError, setIsPaidError] = useState(false);
  const [ErrorProduct, setErrorProduct]: any = useState([]);
  // checkout payment

  // payment
  let totalPrice = 0;

  if (isLoading == false && prevItems?.length) {
    prevItems?.forEach((item: any) => {
      totalPrice += Number(item.price) * Number(item.quantity);
    });
  }

  // console.log(totalPrice)

  const handlePayment = async (data: any) => {
    data.sellingItems = prevItems;
    data.total = totalPrice;
    (document.getElementById("my_modal_1") as any).close();
    // console.log(data);
    const response: any = await payment(data);
    reset();
    if (response?.data?.product?.length == 0) {
      setIsPaid(true);
      setTimeout(() => {
        setIsPaid(false);
      }, 1000);
    } else {
      setErrorProduct(response?.data?.product);
      setIsPaidError(true);
    }
    // console.log(data);
  };

  const handleCloseCartModal = () => {
    setIsPaidError(false);
  };

  //delete all cart at once
  const [deleteAllCart, { isLoading: isAllDeleting }] =
    useDeleteAllCartMutation();

  const [isDeletedAll, setIsDeletedAll] = useState(false);
  const handleDeleteAll = async () => {
    setIsDeletedAll(true);
    const response = await deleteAllCart(undefined);
    // console.log(response)
    if (response) {
      setIsDeletedAll(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Loading...</span>
          </div>
        </div>
      )}
      {isAllDeleting && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Deleting all...</span>
          </div>
        </div>
      )}
      {isDeletedAll && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Deleted</span>
          </div>
        </div>
      )}
      {isPaidError && (
        <div className="toast toast-center toast-middle z-40">
          <div className="alert alert-error">
            <div className="flex flex-col">
              <div className="flex justify-between mb-4">
                {" "}
                <p>Product out of order</p>
                <IoMdClose
                  onClick={handleCloseCartModal}
                  className="cursor-pointer size-5"
                />
              </div>

              <div>
                {ErrorProduct?.map((e: any, i: number) => {
                  return (
                    <>
                      <p>
                        {i + 1}. Product name:{" "}
                        <span className="text-primary cursor-pointer">
                          {e.product_name}{" "}
                        </span>
                        , Available quantity: {e.quantity}
                      </p>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
      {isPaid && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Paid...</span>
          </div>
        </div>
      )}
      {paymentProcessing && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>paying...</span>
          </div>
        </div>
      )}
      {deleteLoading && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>deleting...</span>
          </div>
        </div>
      )}

      <dialog id="my_modal_1" className="modal text-center">
        <div className="modal-box">
          <form action="" onSubmit={handleSubmit(handlePayment)}>
            <input
              className="input input-bordered  w-full max-w-xs mt-6"
              {...register("buyerName", { required: "Buyer name is required" })}
              type="text"
              placeholder="Buyer name"
            />
            {errors.buyerName && (
              <p className="text-red-600">
                {errors.buyerName?.message as string}
              </p>
            )}
            <br />
            <input
              className="input input-bordered  w-full max-w-xs mt-6"
              {...register("contactNo", { required: "Contact No is required" })}
              type="text"
              placeholder="Contact No"
            />
            {errors.contactNo && (
              <p className="text-red-600">
                {errors.contactNo?.message as string}
              </p>
            )}
            <br />
            <input
              className="input input-bordered  w-full max-w-xs mt-6"
              {...register("sellingDate", {
                required: "Selling Date is required",
              })}
              type="date"
              placeholder="Selling Date"
            />
            {errors.sellingDate && (
              <p className="text-red-600">
                {errors.sellingDate?.message as string}
              </p>
            )}
            <br />
            <input
              className="btn w-full max-w-xs mt-6"
              value="Pay"
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

      <div className="hero bg-base-200  mb-16 py-5">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold inline">Checkout</h1>
          </div>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product image</th>
                <th>Product name</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {itemCartData?.cart?.map((item: any) => {
                return (
                  <tr key={`${item?.itemId}123`}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item?.itemImg} alt="Avatar" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item?.itemName}</td>
                    <td>
                      <input
                        onChange={(e) => handleUpdateCart(item, e.target.value)}
                        defaultValue={item?.quantity}
                        type="number"
                        min={1}
                        placeholder="Type here"
                        className="input input-bordered input-primary max-w-xs"
                      />
                    </td>
                    <th>
                      <button
                        onClick={() => handleDeleteFromCart(item)}
                        className="btn btn-outline btn-primary"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mx-5 flex justify-between items-center mt-10">
        <div>
          <h1 className="text-2xl">Cart summary:</h1>
          {prevItems?.length ? (
            <h1>Total: ${totalPrice}</h1>
          ) : (
            <h1>Total: $0</h1>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={handleDeleteAll} className="btn btn-primary">
            Delete all
          </button>
          <p
            onClick={() => {
              openModal();
            }}
            className="btn btn-outline btn-primary "
          >
            Proceed to checkout
          </p>
        </div>
      </div>
    </>
  );
};
export default Checkout;
