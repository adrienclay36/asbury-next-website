import { supabase } from "./supabase-client";


export const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;
  return { from, to };
};


export const getPagedData = async (page, size, table) => {
    let { from, to } = getPagination(page, size);
    const { data } = await supabase.from(table).select().order('id', {ascending: true}).range(from, to - 1);
    
    
    return data;
}

export const getTotalPages = async (size, table) => {
    const { count } = await supabase
      .from(table)
      .select("*", { count: "exact" });

    const totalPages = Math.ceil(count / size);
    return count;
}

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
    if(andQuery) {
        const { data } = await supabase.rpc(queryFunction, { keyword: andQuery });
        let status = "No Data";
        if(data.length === 0) {
            return { data, status }
        }
        return { data: data, status: "ok" };
    }
    return;
}

