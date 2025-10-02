import type { User } from "../types/User.type";
import ListItems from "./ListItems";

type UserItemProps = {
    user: User;
}
const Useritem = ({user}: UserItemProps) => {
    return (
        <ListItems>
            <>
            <b>{user.id}:</b> {user.name} ({user.email})
            </>
        </ListItems>
    );
};



export default Useritem;