export const apiConfig = {
    "Routes":  {
                   "loginUser":  {
                                     "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/login"
                                 },
                   "getImplicitAssociationById":  {
                                                      "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association/{{id}}"
                                                  },
                   "createScreener":  {
                                          "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener"
                                      },
                   "deleteScreener":  {
                                          "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener/{{screenerId}}"
                                      },
                   "generatePresignedUrls":  {
                                                 "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/research/generate-presigned-urls"
                                             },
                   "deleteUserById":  {
                                          "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/delete-user/{{id}}"
                                      },
                   "deleteWelcomeScreen":  {
                                               "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen/{{welcomeScreenId}}"
                                           },
                   "sendTemporaryPassword":  {
                                                 "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/send-temporary-password"
                                             },
                   "getWelcomeScreenByResearch":  {
                                                      "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen/{{researchId}}"
                                                  },
                   "getAllUsers":  {
                                       "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/get-all-users"
                                   },
                   "deleteImplicitAssociation":  {
                                                     "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association/{{id}}"
                                                 },
                   "registerUser":  {
                                        "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/register"
                                    },
                   "logoutUser":  {
                                      "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/logout"
                                  },
                   "updateScreener":  {
                                          "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener/{{researchId}}"
                                      },
                   "createWelcomeScreen":  {
                                               "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen"
                                           },
                   "getScreenerByResearch":  {
                                                 "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener/{{researchId}}"
                                             },
                   "createImplicitAssociation":  {
                                                     "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association"
                                                 },
                   "createResearch":  {
                                          "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/research/create-research"
                                      },
                   "updateUserById":  {
                                          "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/update-user/{{id}}"
                                      },
                   "updateImplicitAssociation":  {
                                                     "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association/{{id}}"
                                                 },
                   "updateWelcomeScreen":  {
                                               "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen/{{researchId}}"
                                           },
                   "getUserById":  {
                                       "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/get-user/{{id}}"
                                   },
                   "uploadFilesToS3":  {
                                           "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/upload-image"
                                       },
                   "refreshToken":  {
                                        "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/refresh-token"
                                    }
               },
    "ApiUrl":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com"
}
