"use client";
import PageLayout from "@/components/layout/page/pageLayout";
import Button from "@/components/UI/button";
import Modal from "@/components/UI/modal";
import { useCallback, useEffect, useRef, useState } from "react";

type ScannerInstance = {
  render: (
    onSuccess: (decodedText: string) => void,
    onFailure: (error: string) => void
  ) => void;
  clear: () => Promise<void>;
};

interface ScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess?: (decodedText: string) => void;
}

const ScreenerModal = ({
  isOpen,
  onClose,
  onScanSuccess,
}: ScreenerModalProps) => {
  const scannerRef = useRef<ScannerInstance | null>(null);
  const [scanResult, setScanResult] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onScanSuccessCallback = useCallback(
    (decodedText: string) => {
      
      setScanResult(decodedText);
      setIsScanning(false);
      
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
      
      if (onScanSuccess) {
        onScanSuccess(decodedText);
      }
    },
    [onScanSuccess]
  );

  const onScanFailure = useCallback(() => {
    
    
    
  }, []);

  useEffect(() => {
    if (!isScanning) return;

    let isMounted = true;
    setErrorMessage("");

    
    import("html5-qrcode")
      .then(({ Html5QrcodeScanner }) => {
        if (!isMounted) return;
        const scanner = new Html5QrcodeScanner(
          "reader",
          {
            qrbox: { width: 250, height: 250 },
            fps: 5,
          },
          false 
        );

        scannerRef.current = scanner as unknown as ScannerInstance;
        scanner.render(onScanSuccessCallback, onScanFailure);
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Failed to load scanner";
        setErrorMessage(message);
        setIsScanning(false);
      });

    return () => {
      isMounted = false;
      if (scannerRef.current) {
        
        scannerRef.current
          .clear()
          .catch(() => {})
          .finally(() => {
            scannerRef.current = null;
          });
      }
    };
  }, [onScanSuccessCallback, onScanFailure, isScanning]);

  const handleRescan = () => {
    setScanResult("");
    setErrorMessage("");
    setIsScanning(true);
  };

  const handleClose = () => {
    
    if (scannerRef.current) {
      scannerRef.current.clear().catch(() => {});
      scannerRef.current = null;
    }
    
    setScanResult("");
    setErrorMessage("");
    setIsScanning(false);
    onClose();
  };

  
  useEffect(() => {
    if (isOpen) {
      setScanResult("");
      setErrorMessage("");
      setIsScanning(true);
    }
  }, [isOpen]);

  return (
    <Modal
      className="max-w-[520px] w-full h-full"
      isOpen={isOpen}
      onClose={handleClose}
      close={true}
      modalMargin={0}
      modalPadding={0}
    >
      <PageLayout backHidden title="Screener">
        <div className="flex flex-col items-center justify-center w-full h-screen p-4">
          {errorMessage && (
            <div className="mb-4 w-full max-w-md rounded border border-red-200 bg-red-50 p-3 text-red-700">
              {errorMessage}
            </div>
          )}

          {isScanning && (
            <div className="qr-scanner relative w-full border-red-200 max-w-md">
              <div id="reader" />
              <div className="scan-frame w-12! hidden" />
              <div className="scan-line bg-none" />
            </div>
          )}

          {scanResult && (
            <div className="mt-6 w-full max-w-md rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="mb-2 text-lg font-semibold text-green-800">
                Scan Result:
              </h3>
              <p className="break-all text-green-700">{scanResult}</p>
              <Button size="lg" onClick={handleRescan} className="rounded-full">
                Scan Again
              </Button>
            </div>
          )}
        </div>
      </PageLayout>
    </Modal>
  );
};

export default ScreenerModal;
