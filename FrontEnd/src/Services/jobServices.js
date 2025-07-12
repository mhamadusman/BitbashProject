import api from "./apiConfig"

const jobService = {
    getAllJobs: async function () {
        try {
            const response = await api.get('/jobs')
            if (response) {
                console.log("have fetched all jobs")
                return response.data
            }
        } catch (error) {
            console.error("error in fetching the jobs", error)
            return null
        }
    },

    getbyId: async function (id) {
        try {
            const response = await api.get(`/jobs/${id}`)   
            return response.data
        } catch (error) {
            console.error("ERROR occurred:")
            console.error("Full error:", error)
            
            if (error.response) {
                console.error("Response data here :", error.response.data)
            } else if (error.request) {
                console.error("No response received")
                console.error("Request:", error.request)
            } else {
                console.error("Error message:", error.message)
            }
            
            return null
        }
    },

    filterJob: async function (filters) {
        try {
            const response = await api.get('/jobs', {
                params: filters,
                paramsSerializer: params => {
                    const query = new URLSearchParams();
                    for (const key in params) {
                        const value = params[key];
                        if (Array.isArray(value)) {
                            value.forEach(val => query.append(key, val)); 
                        } else {
                            query.append(key, value);
                        }
                    }
                    return query.toString();
                }
            });
            return response.data;
        } catch (error) {
            console.log("Error in filtering jobs:", error);
            return null;
        }
    },

    postJob: async function (details) {
        try {
            const response = await api.post('/jobs', details)
            return response.data
        } catch (error) {
            console.log("error in posting a job", error.result)
            return null
        }
    },

    editJob: async function (details) {
        try {    
            const response = await api.put(`/jobs/${details.id}`, details)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log("error in updating post", error)
            return null
        }
    },

    deletePost: async function (id) {
        try {
            const response = await api.delete(`/jobs/${id}`);
            return response.data
        } catch (error) {
            console.log("error in deleting post", error.response)
            return null
        }        
    }
};

export default jobService;