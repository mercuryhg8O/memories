import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios';
import { createUserSuccessful, endpointURL, isValidUser } from '../common/helpers/requestHelpers';

jest.mock("axios");
const login = {"email": "test@email.com", "password": "yippee"};
const creation = {
    "email": login.email,
    "username": "tester",
    "password": login.password,
    "label": "Blog",
    "bio": "yahaha"
}
const id = 'randomaccountid';

// beforeAll(() => {
//     axios.
// });

describe('requestHelpers', () => {

    describe('createUserSuccessful', () => {
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

                const result = await createUserSuccessful(creation.username, creation.email, creation.password, creation.bio);

                expect(axios.post).toHaveBeenCalledWith(
                    endpointURL + `/account/signup`,
                    creation
                );
                console.log(result);
            });
        })
    });

    describe('isValidUser', () => {
        describe("when API call is successful", () => {
            test("should return success message and userId", async () => {
                const response = {
                    data: {
                        message: 'Auth successful',
                        accountId: id
                    }
                };

                axios.post.mockResolvedValueOnce(response);

                const result = await isValidUser(login.email, login.password);

                expect(axios.post).toHaveBeenCalledWith(
                    endpointURL + `/account/login?email=${login.email}&password=${login.password}`,
                    login
                );
                // expect(result).toEqual(expected);
                console.log(result);
            });
        });
    });


});