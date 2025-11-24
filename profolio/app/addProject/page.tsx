export default function AddProject() {
  return (
    <div>
      <form>
        <h1>Proposer un projet</h1>
        <div className="select_pair">
          <label for="title">Titre :</label>
          <input type="text" name="title" id="title" required />
        </div>

         <div className="select_pair">
          <label for="title">URL GitHub :</label>
          <input type="text" name="gitHub" id="gitHub" required />
        </div>

         <div className="select_pair">
          <label for="title"> URL demo :</label>
          <input type="text" name="demo" id="demo" required />
        </div>

         <div className="select_pair">
          <label for="title">Apprenant.e :</label>
          <input type="text" name="title" id="title" required />
        </div>

         <div className="select_pair">
          <label for="title">Projet Ada :</label>
          <input type="text" name="title" id="title" required />
        </div>

      </form>
    </div>
  );
}
