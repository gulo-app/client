import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSearch, faEllipsisV, faPlus, faMinus, faUndo } from '@fortawesome/free-solid-svg-icons';
import { faHome, faDesktop, faHotel, faArchive, faArrowLeft, faTrash, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import { faClipboardList, faComment, faPowerOff, faBarcode, faTimes} from '@fortawesome/free-solid-svg-icons';


import { faFile, faComment as farComment, faBell} from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars, faSearch, faHome, faEllipsisV, faPlus, faMinus, faUndo,
  faDesktop, faHotel, faArchive, faFile, faArrowLeft, faTrash,
  faClipboardList, faComment, farComment, faPowerOff, faBarcode, faBell, faTimes,
  faShareAlt, faWhatsapp
);

export default library;
