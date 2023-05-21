import { useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  CustomerInfo,
  PurchasesOffering,
} from "react-native-purchases";

const APIKeys = {
  apple: "appl_AiMBICCfpTMnbwQBBTtVAOekYDe",
  google: "your_revenuecat_google_api_key",
};

const typesOfMembership = {
  monthly: "proMonthly",
  yearly: "proYearly",
};

function useRevenueCat() {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const isProMember =
    customerInfo?.activeSubscriptions.includes(typesOfMembership.monthly) ||
    customerInfo?.activeSubscriptions.includes(typesOfMembership.yearly);

  useEffect(() => {
    const fetchData = async () => {
      Purchases.setDebugLogsEnabled(true);
      if (Platform.OS == "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else {
        await Purchases.configure({ apiKey: APIKeys.apple });
      }
      const offerings = await Purchases.getOfferings();
      const customerInfo = await Purchases.getCustomerInfo();

      setCurrentOffering(offerings.current);
      setCustomerInfo(customerInfo);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
      setCustomerInfo(purchaserInfo);
    };

    Purchases.addCustomerInfoUpdateListener(customerInfoUpdated);
  }, []);

  return {
    isProMember,
    currentOffering,
    customerInfo,
  };
}

export default useRevenueCat;
