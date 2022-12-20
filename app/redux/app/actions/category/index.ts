import urqlQuery from "~/graphql/";
import { GetCategories } from "~/graphql/queries/categories";
import {
  CreateCategory,
  UpdateCategory,
  DeleteCategory,
} from "~/graphql/mutations/categories";
import type { Dispatch } from "redux";
import {
  requestStartInitilizeLoading,
  requestSuccessUpdateStateData,
  requestCompleteDisableLoading,
} from "../../";
import { notification } from "antd";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function GetCategoriesAction() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStartInitilizeLoading());
    try {
      urqlQuery
        .query(GetCategories, {
          vendorId: cookies.get("vendorId"),
          sortOrder: { direction: "desc", field: "createdAt" },
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          //change to backend sort once implemented
          const data = { list: result.data.getCategories, totalCount: null };

          dispatch(requestSuccessUpdateStateData(data));
        });
    } catch (error) {
      throw error;
    }
  };
}

export function CategoryAction(
  data: any,
  setCategoryDrawerOpen: any,
  selectedAction: string,
  id: string
) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    try {
      data.vendorId = cookies.get("vendorId");
      urqlQuery
        .mutation(
          selectedAction === "new-category" ? CreateCategory : UpdateCategory,
          selectedAction === "new-category"
            ? {
                ...data,
              }
            : {
                ...data,
                id,
              }
        )
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }

          let stateData = state();

          if (selectedAction === "new-category") {
            let newStateData = {
              totalCount: null,
              list: [...stateData.app.data.list, result?.data?.createCategory],
            };
            dispatch(requestSuccessUpdateStateData(newStateData));
          } else {
            const filteredData = stateData.app.data.list.filter(
              (category: any) => category.id !== id
            );
            let newStateData = {
              totalCount: null,
              list: [result?.data?.updateCategory, ...filteredData],
            };
            dispatch(requestSuccessUpdateStateData(newStateData));
          }

          notification.success({
            message:
              selectedAction === "new-category"
                ? "Category created successfully"
                : "Category updated successfully",
          });
          setCategoryDrawerOpen(false);
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}

export function DeleteCategoryAction(id: string) {
  return async (dispatch: Dispatch, state: any) => {
    dispatch(requestStartInitilizeLoading());
    let stateData = state();

    let records = stateData.app.data.list;
    try {
      urqlQuery
        .mutation(DeleteCategory, {
          id,
        })
        .toPromise()
        .then((result) => {
          if (!result || !result.data) {
            throw new Error("Something went wrong");
          }
          let filteredRecords = records.filter(
            (record: any) => record.id !== id
          );

          let newStateData = {
            totalCount: null,
            list: filteredRecords,
          };

          notification.success({
            message: "Category deleted successfully",
          });
          dispatch(requestSuccessUpdateStateData(newStateData));
          dispatch(requestCompleteDisableLoading());
        });
    } catch (error) {
      throw error;
    }
  };
}
