const TwoFactorDescription = () => {
  return (
    <>
      <div className="flex flex-col gap-4 mt-8 text-lg text-foreground">
        <p className="text-base leading-relaxed">
          Two-factor authentication secures your account by adding an extra
          layer of security. To enhance account safety, we recommend enabling at
          least two of the following options:
        </p>

        <ul className="flex flex-col gap-3 text-base">
          <li className="flex items-start gap-3">
            <span className="font-bold">•</span>
            <span>
              Once enabled, withdrawals will be disabled for 24 hours to ensure
              your security.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold">•</span>
            <span>
              All withdrawal or transfer requests will require two-factor
              authentication approval.
            </span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TwoFactorDescription;
