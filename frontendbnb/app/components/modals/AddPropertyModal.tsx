"use client";

import useAddPropertyModal from "@/app/hooks/useAddPropertyModal";
import Modal from "./Modal";
import CustomButton from "../forms/CustomButton";
import { ChangeEvent, useState } from "react";
import Categories from "../addproperty/Categories";
import SelectCountry, { SelectCountryValue } from "../forms/SelectCountry";
import Image from "next/image";
import apiService from "@/app/services/apiService";
import { useRouter } from "next/navigation";

const AddPropertyModal = () => {
  //
  //
  const router = useRouter();

  const [currentStep, setCurrentState] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [dataCategory, setDataCategory] = useState("");
  const [dataTitle, setDataTitle] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataCountry, setDataCountry] = useState<SelectCountryValue>();
  const [dataImage, setDataImage] = useState<File | null>(null);

  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [guests, setGuests] = useState("");

  //
  //
  const addPropertyModal = useAddPropertyModal();

  //
  //
  const setCategory = (category: string) => {
    setDataCategory(category);
  };

  //
  //

  const setImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const tmpImage = event.target.files[0];
      setDataImage(tmpImage);
    }
  };

  //
  //

  const submitForm = async () => {
    setErrors([]);

    if (
      dataCategory &&
      dataTitle &&
      dataDescription &&
      price &&
      dataCountry &&
      dataImage
    ) {
      const formData = new FormData();
      formData.append("category", dataCategory);
      formData.append("title", dataTitle);
      formData.append("description", dataDescription);
      formData.append("price_per_night", price);
      formData.append("bedrooms", bedrooms);
      formData.append("bathrooms", bathrooms);
      formData.append("guests", guests);
      formData.append("country", dataCountry.label);
      formData.append("country_code", dataCountry.value);
      formData.append("image", dataImage);

      try {
        const response = await apiService.postFormData(
          "/api/properties/create/",
          formData
        );

        console.log("form data ==> Response", response);

        addPropertyModal.close();
        router.refresh();
        router.push("/");
      } catch (err: any) {
        if (typeof err === "object" && err !== null) {
          const backendErrors = Object.values(err)
            .flat()
            .map((msg) => String(msg));
          setErrors(backendErrors);
        } else {
          setErrors(["Failed to create property"]);
        }
      }
    } else {
      setErrors(["Please fill in all required fields"]);
    }
  };

  //
  //

  const content = (
    <>
      {currentStep == 1 ? (
        <>
          <h2 className="mb-6 text-2xl">Choose category</h2>

          <Categories
            dataCategory={dataCategory}
            setCategory={(category) => setCategory(category)}
          />
          <CustomButton label="Next" onClick={() => setCurrentState(2)} />
        </>
      ) : currentStep == 2 ? (
        <>
          <h2 className="mb-6 text-2xl">Describe your place</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Title</label>
              <input
                type="text"
                value={dataTitle}
                onChange={(e) => {
                  setDataTitle(e.target.value);
                }}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Description</label>
              <textarea
                value={dataDescription}
                onChange={(e) => {
                  setDataDescription(e.target.value);
                }}
                className="w-full h-50 p-4 border border-gray-600 rounded-xl"
              ></textarea>
            </div>
          </div>
          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentState(1)}
          />
          <CustomButton label="Next" onClick={() => setCurrentState(3)} />
        </>
      ) : currentStep == 3 ? (
        <>
          <h2 className="mb-6 text-2xl">Details</h2>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Price per Night</label>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => {
                  setBedrooms(e.target.value);
                }}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>

          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Bathrooms</label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => {
                  setBathrooms(e.target.value);
                }}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>
          <div className="pt-3 pb-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <label>Maximum No. of Guests</label>
              <input
                type="number"
                value={guests}
                onChange={(e) => {
                  setGuests(e.target.value);
                }}
                className="w-full p-4 border border-gray-600 rounded-xl"
              />
            </div>
          </div>
          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentState(2)}
          />
          <CustomButton label="Next" onClick={() => setCurrentState(4)} />
        </>
      ) : currentStep == 4 ? (
        <>
          <h2 className="mb-6 text-2xl">Location</h2>
          <div className="pt-3 pb-6 space-y-4">
            <SelectCountry
              value={dataCountry}
              onChange={(value) => setDataCountry(value as SelectCountryValue)}
            />
          </div>
          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentState(3)}
          />
          <CustomButton label="Next" onClick={() => setCurrentState(5)} />
        </>
      ) : (
        <>
          <h2 className="mb-6 text-2xl">Image</h2>
          <div className="pt-3 pb-6 space-y-4">
            <div className="py-4 px-6 bg-gray-700 text-white rounded-2xl border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors duration-300">
              <input
                type="file"
                accept="image/*"
                onChange={setImage}
                className="w-full cursor-pointer"
              />
            </div>
            {dataImage && (
              <div className="w-[200px] h-[150px] relative rounded-xl overflow-hidden shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300">
                <Image
                  fill
                  alt="uploaded image"
                  src={URL.createObjectURL(dataImage)}
                />
              </div>
            )}
          </div>
          {errors.map((error, index) => {
            return (
              <div
                key={index}
                className="p-5 mb-4 bg-rose-500 text-white rounded-xl opacity-80"
              >
                {error}
              </div>
            );
          })}

          <CustomButton
            label="Previous"
            className="mb-2 bg-black hover:bg-gray-800"
            onClick={() => setCurrentState(4)}
          />
          <CustomButton label="Submit" onClick={submitForm} />
        </>
      )}
    </>
  );

  return (
    <>
      <Modal
        isOpen={addPropertyModal.isOpen}
        close={addPropertyModal.close}
        label="Add Property"
        content={content}
      />
    </>
  );
};

export default AddPropertyModal;
