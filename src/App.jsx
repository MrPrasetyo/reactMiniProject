import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import React from "react";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import { toast } from "react-toastify";
import JobPage, { jobLoader } from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import axios from "axios";

// Add Jobs
const App = () => {
  const addJob = async (newJob) => {
    try {
      const res = await axios.post("/api/jobs", newJob);
      console.log("Job added Succesfully", res.data);
      toast.success('Job added Succesfully!')
    } catch (error) {
      toast.error('Failed to Adding Job')
      console.error("Error adding Job", error);
    }
  };

  // Delete Jobs
  const deleteJob = async (id) => {
    try {
      const res = await axios.delete(`/api/jobs/${id}`, deleteJob);
      console.log("Job deleted Succesfully", res.data);
      toast.success('Job deleted Succesfully')
    } catch (error) {
      toast.error('Failed to Deleting Job')
      console.error("Error deleting Job", error);
    }
  };

  const updateJob = async(job) => {
    try {
      const res = await axios.put(`/api/jobs/${job.id}`, job);
      console.log("Job updated Succesfully", res.data);
      toast.success("Job Updated Succesfully!");
    } catch (error) {
      toast.error('Failed to Update Job')
      console.error("Error update Job", error);
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
