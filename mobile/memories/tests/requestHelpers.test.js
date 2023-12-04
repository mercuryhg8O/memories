import axios from 'axios';
import { createUserSuccessful, BASE_URL, getUserData, isValidUser, followUser, getMemoryDetails, createMemorySuccessful } from '../common/helpers/requestHelpers';

jest.mock("axios");

afterEach(() => {
    jest.clearAllMocks();
});

const login = {"email": "test@email.com", "password": "yippee"};
const profile = {
    "email": login.email,
    "username": "tester",
    "password": login.password,
    "label": "Blog",
    "bio": "yahaha"
}
const id = 'randomaccountid';

describe('requestHelpers', () => {

    // createUserSuccessful
    describe('createUserSuccessful', () => {
        const requestURL = BASE_URL + `/account/signup`;
        describe('when API call is successful', () => {
            test('should return success message and userId', async () => {
                const response = {
                    data: {
                        createdAccount: {
                            _id: id
                        }
                    }
                };
                axios.post.mockResolvedValueOnce(response);

                const expected = {
                    created_account: true,
                    userId: id
                }

                const result = await createUserSuccessful(profile.username, profile.email, profile.password, profile.bio);

                expect(axios.post).toHaveBeenCalledWith(requestURL, profile);
                expect(result).toEqual(expected);
            });
        });
        describe('when API call fails', () => {
            test('should return fail message and blank userId', async () => {
                axios.post.mockRejectedValue(new Error("whoopsie doodle"));

                const expected = {
                    created_account: false,
                    userId: ''
                }

                const result = await createUserSuccessful(profile.username, profile.email, profile.password, profile.bio);

                expect(axios.post).toHaveBeenCalledWith(requestURL, profile);
                expect(result).toEqual(expected);
            });
        });
    });

    // isValidUser
    describe('isValidUser', () => {
        const requestURL = BASE_URL + `/account/login?email=${login.email}&password=${login.password}`;
        describe("when API call is successful", () => {
            test("should return success message and userId", async () => {
                const response = {
                    data: {
                        message: 'Auth successful',
                        accountID: id
                    }
                };
                const expected = { signed_in_worked: true, userId: id };

                axios.post.mockResolvedValueOnce(response);

                const result = await isValidUser(login.email, login.password);

                expect(axios.post).toHaveBeenCalledWith(requestURL, login);
                expect(result).toEqual(expected);
            });
        });
        describe("when API call fails", () => {
            test("should return fail message and temp userId", async () => {
                const expected = { signed_in_worked: false, userId: 'tempuserid' };

                axios.post.mockRejectedValue(new Error("whoopsie doodle"));

                const result = await isValidUser(login.email, login.password);

                expect(axios.post).toHaveBeenCalledWith(requestURL, login);
                expect(result).toEqual(expected);
            });
        });
    });

    // getUserData
    describe('getUserData', () => {
        const requestURL = BASE_URL + `/account/${id}`;
        describe("when API call is successful", () => {
            console.log("GETUSERDATA SUCCESS");
            test("should return success message, username, and bio", async () => {
                const response = {
                    data: {
                        doc: {
                            username: profile.username,
                            bio: profile.bio
                        }
                    }
                };
                const expected = { found_user: true, username: profile.username, bio: profile.bio };

                axios.get.mockResolvedValueOnce(response);

                const result = await getUserData(id);

                expect(axios.get).toHaveBeenCalledWith(requestURL);
                expect(result).toEqual(expected);
            });
        });
        describe("when API call fails", () => {
            test("should return fail message and default username and bio", async () => {
                const expected = { found_user: false, username: 'default username', bio: 'default bio' };

                axios.get.mockRejectedValue(new Error("whoopsie doodle"));

                const result = await getUserData(id);

                expect(axios.get).toHaveBeenCalledWith(requestURL);
                expect(result).toEqual(expected);

            });
        });
    });

    // followUser
    describe('followUser', () => {
        const userToFollow = 'randomuserid2';
        const requestURL = BASE_URL + `/account/${userToFollow}/${id}/follow`;
        describe("when API call is successful", () => {
            test("should return true", async () => {
                const response = {
                    status: 'yayy!! yippee!!! if there is a real status message format please plug',
                    follow_request_sent: true
                };
                const expected = true;

                axios.post.mockResolvedValueOnce(response);

                const result = await followUser(id, userToFollow);

                expect(axios.post).toHaveBeenCalledWith(requestURL);
                expect(result).toEqual(expected);
            });
        });
        describe("when API call fails", () => {
            test("should return false", async () => {
                const expected = false;

                axios.post.mockRejectedValue(new Error("whoopsie doodle"));

                const result = await followUser(id, userToFollow);

                expect(axios.post).toHaveBeenCalledWith(requestURL);
                expect(result).toEqual(expected);
            });
        });
    });

    // getMemoryDetails
    describe('getMemoryDetails', () => {
        const memoryId = 'rememberwhen?';
        const requestURL = BASE_URL + `/memory/id/${memoryId}`;
        describe("when API call is successful", () => {
            test("should return memory details", async () => {
                const response = {
                    data: {
                        memory: {
                            accountName: profile.username,
                            bodyText: "woot",
                            likedBy: ['hook', 'line', 'sinker'],
                            tags: '^_^'
                        }
                    }
                };
                const expected = {
                    username: response.data.memory.accountName,
                    memoryDescription: response.data.memory.bodyText,
                    numOfLikes: response.data.memory.likedBy.length,
                    tags: response.data.memory.tags
                };

                axios.get.mockResolvedValueOnce(response);

                const result = await getMemoryDetails(memoryId);

                expect(axios.get).toHaveBeenCalledWith(requestURL);
                expect(result).toEqual(expected);
            });
        });
        describe("when API call fails", () => {
            test("should return erroneous memory details", async () => {
                const expected = {
                    username: 'error user example',
                    memoryDescription: 'error example',
                    numOfLikes: 0,
                    tags: 'error example'
                };

                axios.get.mockRejectedValue(new Error("whoopsie doodle"));

                const result = await getMemoryDetails(memoryId);

                expect(axios.get).toHaveBeenCalledWith(requestURL);
                expect(result).toEqual(expected);
            });
        });
    });

    // createMemorySuccessful
    describe('createMemorySuccessful', () => {
        const memory = {
            bodyText: 'hello',
            visibility: 'Public',
            accountID: id,
            tags: 'goodbye',
            latitude: 42.7328086,
            longitude: -73.685083
        };
        const requestURL = BASE_URL + `/memory`;
        describe("when API call is successful", () => {
            test("should return true", async () => {
                const response = {
                    data: {
                        message: 'Created memory successfully',
                        created_memory: {
                            _id: 'memoryIdentityityity'
                        }
                    }
                };
                const expected = true;

                axios.post.mockResolvedValueOnce(response);

                const result = await createMemorySuccessful(
                    memory.accountID, memory.bodyText, memory.visibility,
                    memory.tags, memory.latitude, memory.longitude
                );

                expect(axios.post).toHaveBeenCalledWith(requestURL, memory);
                expect(result).toEqual(expected);
            });
        });
        describe("when API call fails", () => {
            test("should return false", async () => {
                const expected = false;

                axios.post.mockRejectedValue(new Error("whoopsie doodle"));

                const result = await createMemorySuccessful(
                    memory.accountID, memory.bodyText, memory.visibility,
                    memory.tags, memory.latitude, memory.longitude
                );

                expect(axios.post).toHaveBeenCalledWith(requestURL, memory);
                expect(result).toEqual(expected);
            });
        });
    });


});