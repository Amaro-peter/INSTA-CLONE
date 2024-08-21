import Notifications from './Notifications';
import Home from './Home';
import ProfileLink from './ProfileLink';
import CreatePost from './CreatePost';
import Search from './Search';

function SidebarItems() {
  return (
    <>
        <Home />
        <Search />
        <Notifications />
        <CreatePost />
        <ProfileLink />
    </>
  )
}

export default SidebarItems