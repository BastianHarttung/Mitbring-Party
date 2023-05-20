import Switch from "../ui-components/Switch";
import userStore from "../stores/user-store";
import {ChangeEvent, useState} from "react";
import {GrEdit} from "react-icons/gr"
import {FaRegSave} from "react-icons/fa"


const Profil = () => {

  const {
    userName,
    isAdmin,
    adminLogout,
    setUserName,
    openModalAdminPassword,
  } = userStore

  const [name, setName] = useState(userName ?? "");
  const [edit, setEdit] = useState(false);

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleSaveName = () => {
    setUserName(name)
    setEdit(false)
  }


  return (
    <section>
      <div className="section_content">

        <h3>Profil</h3>

        <div className="flex-column-gap-3">
          <div className="flex-row justify-space-between gap-2">
            <label htmlFor="name">Name</label>
            <input name="name"
                   type="text"
                   disabled={!edit}
                   value={name}
                   onChange={handleChangeName}/>
            {edit ? <FaRegSave onClick={handleSaveName}/>
              : <GrEdit onClick={() => setEdit(true)}/>}
          </div>

          <div className="flex-row justify-space-between">
            <label htmlFor="">Administrator-Modus</label>
            <Switch isActive={isAdmin}
                    onIsActive={openModalAdminPassword}
                    onDeactivate={adminLogout}/>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Profil;
