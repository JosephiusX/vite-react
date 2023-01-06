import { Outlet, NavLink, Link, useLoaderData, Form, redirect ,useNavigation} from "react-router-dom";
import { getContacts, createContact  } from "../contacts";

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ params }) {
  const contacts = await getContacts(params.contactId);
  return { contacts };
}

export default function Root() {
  const { contacts } = useLoaderData();
  const navigation = useNavigation();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
      </div>
      <div
        id="detail"
        className={
          navigation.state === "loading" ? "loading" : ""
        }
      >
        <Outlet />
      </div>
    </>
  );
}