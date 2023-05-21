import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../App";
import useRevenueCat from "../hooks/useRevenueCat";

export type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

type Props = {
  title: string;
  screen: any;
  color: string;
  requiresPro?: boolean;
  icon?: any;
  vertical?: boolean;
};

const ActionRow = ({
  title,
  screen,
  color,
  requiresPro,
  icon,
  vertical,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const { isProMember } = useRevenueCat();

  const lockForProMembers = requiresPro && !isProMember;
  return (
    <TouchableOpacity
      onPress={() =>
        lockForProMembers
          ? navigation.navigate("Paywall")
          : navigation.navigate(screen)
      }
      className={`flex m-2 flex-1 justify-center items-center py-6 rounded-lg space-x-2 ${
        vertical ? "flex-col" : "flex-row"
      }`}
      style={{ backgroundColor: lockForProMembers ? "#f5ebe0" : color }}
    >
      {lockForProMembers && (
        <View className="absolute top-4 right-4 rotate-12 items-center">
          <Ionicons name="lock-closed" size={20} color="#E5962D" />
          <Text className="text-[#E5962D] font-extrabold">PRO</Text>
        </View>
      )}
      <Ionicons name={icon} size={30} color="white" />
      <Text className="text-white font-bold text-lg">{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionRow;
