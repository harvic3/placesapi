import resources, { resourceKeys, Resources } from "../locals/index";
export { IResultT, ResultT, Result, IResult } from "result-tsk";
import * as resultCodes from "../errors/codes.json";
import { Validator } from "validator-tsk";
import mapper, { IMap } from "mapper-tsk";

export class BaseUseCase {
  constructor() {
    this.validator = new Validator(resources, resourceKeys.SOME_PARAMETERS_ARE_MISSING);
    this.resources = resources;
    this.mapper = mapper;
  }
  mapper: IMap;
  validator: Validator;
  resources: Resources;
  resourceKeys = resourceKeys;
  resultCodes = resultCodes;
}
