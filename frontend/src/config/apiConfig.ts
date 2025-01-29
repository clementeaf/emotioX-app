export const apiConfig = {
    "Routes":  {
                   "getAllUsers":  {
                                       "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/get-all-users"
                                   },
                   "sendTemporaryPassword":  {
                                                 "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/send-temporary-password"
                                             },
                   "getThankYouScreenById":  {
                                                 "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/thank-you-screen/{{id}}"
                                             },
                   "deleteThankYouScreen":  {
                                                "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/thank-you-screen/{{id}}"
                                            },
                   "getWelcomeScreenByResearch":  {
                                                      "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen/{{researchId}}"
                                                  },
                   "logoutUser":  {
                                      "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/logout"
                                  },
                   "createThankYouScreen":  {
                                                "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/thank-you-screen"
                                            },
                   "deleteCognitiveTask":  {
                                               "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/cognitive-task/{{id}}"
                                           },
                   "deleteWelcomeScreen":  {
                                               "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen/{{welcomeScreenId}}"
                                           },
                   "deleteScreener":  {
                                          "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener/{{screenerId}}"
                                      },
                   "getEyeTrackingTaskById":  {
                                                  "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/eye-tracking-task/{{id}}"
                                              },
                   "createScreener":  {
                                          "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener"
                                      },
                   "loginUser":  {
                                     "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/login"
                                 },
                   "createImplicitAssociation":  {
                                                     "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association"
                                                 },
                   "updateWelcomeScreen":  {
                                               "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen/{{researchId}}"
                                           },
                   "updateEyeTrackingTask":  {
                                                 "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/eye-tracking-task/{{id}}"
                                             },
                   "getUserById":  {
                                       "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/get-user/{{id}}"
                                   },
                   "createEyeTrackingTask":  {
                                                 "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/eye-tracking-task"
                                             },
                   "createCognitiveTask":  {
                                               "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/cognitive-task"
                                           },
                   "registerUser":  {
                                        "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/register"
                                    },
                   "getImplicitAssociationById":  {
                                                      "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association/{{id}}"
                                                  },
                   "getScreenerByResearch":  {
                                                 "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener/{{researchId}}"
                                             },
                   "createResearch":  {
                                          "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/research/create-research"
                                      },
                   "updateUserById":  {
                                          "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/update-user/{{id}}"
                                      },
                   "deleteUserById":  {
                                          "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/delete-user/{{id}}"
                                      },
                   "uploadFilesToS3":  {
                                           "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/upload-image"
                                       },
                   "updateScreener":  {
                                          "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/screener/{{researchId}}"
                                      },
                   "updateThankYouScreen":  {
                                                "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/thank-you-screen/{{id}}"
                                            },
                   "updateImplicitAssociation":  {
                                                     "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association/{{id}}"
                                                 },
                   "getCognitiveTaskById":  {
                                                "GET":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/cognitive-task/{{id}}"
                                            },
                   "createWelcomeScreen":  {
                                               "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/welcome-screen"
                                           },
                   "updateCognitiveTask":  {
                                               "PUT":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/cognitive-task/{{id}}"
                                           },
                   "refreshToken":  {
                                        "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/refresh-token"
                                    },
                   "generatePresignedUrls":  {
                                                 "POST":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/research/generate-presigned-urls"
                                             },
                   "deleteEyeTrackingTask":  {
                                                 "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/eye-tracking-task/{{id}}"
                                             },
                   "deleteImplicitAssociation":  {
                                                     "DELETE":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com/implicit-association/{{id}}"
                                                 }
               },
    "ApiUrl":  "https://gmwvbhostj.execute-api.us-east-1.amazonaws.com"
}
