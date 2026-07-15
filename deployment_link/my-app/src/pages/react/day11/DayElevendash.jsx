const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-center items-center h-screen bg-slate-900">
      <div className="bg-white p-6 rounded text-center">
        <h1 className="text-3xl font-bold">
          Welcome {user?.name}
        </h1>

        <p className="mt-3">Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;