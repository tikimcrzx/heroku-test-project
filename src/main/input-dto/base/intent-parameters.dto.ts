import { ParameterOrderDTO } from '../parameters/parameters-order.dto';
import { ParameterRestaurantDTO } from '../parameters/parameters-restaurant.dto';
import { ParameterMaxOrderDTO } from '../parameters/parameters-maxorder.dto';

export interface IntentParameterDTO {
  readonly queryResult: {
    readonly queryText: string;
    readonly parameters:
      | ParameterOrderDTO
      | ParameterRestaurantDTO
      | ParameterMaxOrderDTO;
    readonly allRequiredParamsPresent: boolean;
    readonly fulfillmentText: string;
    readonly fulfillmentMessages: [
      {
        readonly quickReplies: {};
        readonly plataform: string;
      },
      {
        readonly text: {};
      },
    ];
    readonly outputContexts: [
      {
        readonly name: string;
        readonly parameters: any;
      },
    ];
    readonly intent: {
      readonly name: string;
      readonly displayName: string;
    };
    readonly intentDetectionConfidence: string;
  };
}
