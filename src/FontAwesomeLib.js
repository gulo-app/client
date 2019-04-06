import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faSearch, faEllipsisV, faPlus, faMinus, faUndo } from '@fortawesome/free-solid-svg-icons';
import { faHome, faDesktop, faHotel, faArchive, faArrowLeft, faTrash} from '@fortawesome/free-solid-svg-icons';
import { faClipboardList, faComment, faPowerOff} from '@fortawesome/free-solid-svg-icons';

import { faFile, faComment as farComment} from '@fortawesome/free-regular-svg-icons';

library.add(
  faBars, faSearch, faHome, faEllipsisV, faPlus, faMinus, faUndo,
  faDesktop, faHotel, faArchive, faFile, faArrowLeft, faTrash,
  faClipboardList, faComment, farComment, faPowerOff
);

export default library;
