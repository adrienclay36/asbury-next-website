import { supabase } from "./supabase-client";

export const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;
  return { from, to };
};

export const getPagedData = async (page, size, table) => {
  let { from, to } = getPagination(page, size);
  const { data } = await supabase
    .from(table)
    .select()
    .order("id", { ascending: true })
    .range(from, to - 1);

  return data;
};

export const getPagedDataByDate = async (page, size, table, dateColumn) => {
  let { from, to } = getPagination(page, size);
  const { data } = await supabase
    .from(table)
    .select()
    .order(dateColumn, { ascending: false }).order('id', { ascending: false})
    .range(from, to - 1);

  return data;
};

export const getTotalPages = async (size, table) => {
  const { count } = await supabase.from(table).select("*", { count: "exact" });

  const totalPages = Math.ceil(count / size);
  return totalPages;
};

export const splitQuery = (queryToSplit) => {
  if (queryToSplit) {
    const queryVector = queryToSplit.split(" ");
    const filtered = queryVector.filter((word) => word !== "" && word !== " ");
    if (filtered.length > 1) {
      const joinedAnd = filtered.join(" & ");
      return joinedAnd;
    } else {
      return queryToSplit.trim();
    }
  }
};

export const getQueriedData = async (table, query, queryFunction) => {
  const andQuery = splitQuery(query);
  if (andQuery) {
    const { data } = await supabase.rpc(queryFunction, { keyword: andQuery });
    let status = "No Data";
    if (data.length === 0) {
      return { data, status };
    }
    return { data: data, status: "ok" };
  }
  return;
};

export const getItemById = async (table, id) => {
  const { data } = await supabase.from(table).select().match({ id });
  return data;
};

export const getAllItems = async (table) => {
  const { data } = await supabase.from(table).select();

  return data;
};

export const addItemToTable = async (table, object) => {
  try {
    await supabase.from(table).insert([object]);
    return { status: "ok", error: "None" };
  } catch (err) {
    return { status: "error", error: err.message };
  }
};

export const deleteItemFromTable = async (table, id) => {
  try {
    await supabase.from(table).delete().match({ id: id });
    return { status: "ok", error: "None" };
  } catch (err) {
    return { status: "error", error: err.message };
  }
};

export const updateItemInTable = async (table, id, object) => {
  try {
    await supabase.from(table).update(object).match({id: id});
    return { status: "ok", error: "None" };
  } catch (err) {
    return { status: "error", error: err.message };
  }
}


export const toggleBooleanValue = async (table, id, column) => {
  try {
    const { data } = await supabase.from(table).select(column).match({id: id});
    const originalValue = data[0][column]
    await supabase.from(table).update({ availability: !originalValue }).match({ id: id });
    return { status: "ok", error: "None" };
  } catch (err) {
    return { status: "error", error: err.message };
  }
}


export const getSignedUrl = async (bucket, filename) => {

  const { signedURL, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filename, 60);
  return signedURL;
}
