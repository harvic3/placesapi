import { IHistoricalRepository } from "../../../historical/serviceContracts/IHistoricalRepository";
import { IPlacesProvider } from "../../providerContracts/IPlaceProvider";
import resources, { resourceKeys } from "../../../../shared/locals";
import * as resultCodes from "../../../../shared/errors/codes.json";
import { PlaceDto } from "../../dtos/PlaceDto";
import { SearchPlacesUseCase } from "./index";
import { mock } from "jest-mock-extended";

// Mocks
import { goodSession } from "../../../../mocks/Session.mock";
import { searchByCity } from "../../../../mocks/SearchDto.mock";
import { resultPlaces } from "../../../../mocks/PlaceDto.mock";

const placesProvider = mock<IPlacesProvider>();
const historicalRepository = mock<IHistoricalRepository>();

const searchPlacesUseCase = new SearchPlacesUseCase(placesProvider, historicalRepository);

describe("When try to search places", () => {
  beforeAll(() => {
    resources.Init(goodSession.language);
  });
  it("should return an error if session is null", async () => {
    const result = await searchPlacesUseCase.Execute(searchByCity, null);
    expect(result.success).toBeFalsy();
    expect(result.statusCode).toBe(resultCodes.BAD_REQUEST);
    expect(result.error).toBe(
      resources.GetWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
        missingParams: "Session",
      }),
    );
  });
  it("should return an error if searchDto is null", async () => {
    const result = await searchPlacesUseCase.Execute(null, goodSession);
    expect(result.success).toBeFalsy();
    expect(result.statusCode).toBe(resultCodes.BAD_REQUEST);
    expect(result.error).toBe(resources.Get(resourceKeys.NOT_VALID_SEARCH));
  });
  it("should return result data when search by city", async () => {
    placesProvider.Search.mockResolvedValue([resultPlaces, null]);
    historicalRepository.Create.mockResolvedValue(Promise.resolve());
    const result = await searchPlacesUseCase.Execute(searchByCity, goodSession);
    expect(result.success).toBeTruthy();
    expect(result.statusCode).toBe(resultCodes.SUCCESS);
    const resultData = result.data as PlaceDto[];
    expect(resultData.length).toBe(1);
  });
});
