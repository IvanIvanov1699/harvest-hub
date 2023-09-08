import ProfileDetails from "./ProfileDetails";
import ProfileChangePassword from "./ProfileChangePassword";
import ProfileAddresses from "./ProfileAddresses";
import ProfileOrders from "./ProfileOrders";
import ProfileDeletion from "./ProfileDeletion";

const ProfileMenuPicker = ({ view }) => {
  let selectedComponent;

  switch (view) {
    case "Profile":
      selectedComponent = <ProfileDetails />;
      break;
    case "ChangePassword":
      selectedComponent = <ProfileChangePassword />;
      break;
    case "Addresses":
      selectedComponent = <ProfileAddresses />;
      break;
    case "Orders":
      selectedComponent = <ProfileOrders />;
      break;
    case "DeleteAccount":
      selectedComponent = <ProfileDeletion />;
      break;
    default:
      selectedComponent = null;
  }

  return selectedComponent;
};

export default ProfileMenuPicker;
