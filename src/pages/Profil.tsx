import Switch from "../ui-components/Switch";
import userStore from "../stores/user-store";


const Profil = () => {

  const {adminLogout} = userStore

  return (
    <section>
      <div className="section_content">

        <h3>Profil</h3>

        <div className="flex-column-gap-3">
          <div className="flex-row justify-space-between">
            <label htmlFor="name">Name</label>
            <input name="name" type="text"/>
          </div>

          <div className="flex-row justify-space-between">
            <label htmlFor="">Administrator-Modus</label>
            <Switch onIsActive={() => console.log("activate")}
                    onDeactivate={adminLogout}/>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Profil;
