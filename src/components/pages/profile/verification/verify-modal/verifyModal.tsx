import Button from "@/components/UI/button";
import Modal from "@/components/UI/modal";
import VerifyImage from "@/public/svgs/verify-illustrat.svg";
import Image from "next/image";

const VerifyModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <p className="text-sm mb-6">
          Verify Your Account To use all the features of our platform, please
          verify your account. Verifying your account helps us keep your account
          secure.
        </p>

        <Image
          src={VerifyImage}
          className="mx-auto mb-6"
          alt="verify"
          width={150}
          height={150}
        />

        <div className="text-left space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Information needed:</h3>
            <p className="text-gray-700">
              Phone number, National ID, Date of birth
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Time required:</h3>
            <p className="text-gray-700">1 minute</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Daily limits:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Daily deposit limit: $100</li>
              <li>Daily withdrawal limit: $400</li>
              <li>
                Cryptocurrency deposit limit: No deposit limit for
                cryptocurrencies
              </li>
              <li>Daily cryptocurrency withdrawal limit: $20</li>
            </ul>
          </div>
        </div>
      </div>
      <Button className="w-fit px-6 mx-auto mt-4 rounded-xl" size="lg">
      Verify Now
      </Button>
    </Modal>
  );
};

export default VerifyModal;
