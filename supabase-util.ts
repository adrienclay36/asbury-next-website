import { supabase } from "./supabase-client";
import { Permission, PermissionSet } from "./types/permission-set";

export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size : size;
  return { from, to };
};

export const getPagedData = async (page: number, size: number, table: string) => {
  let { from, to } = getPagination(page, size);
  const { data } = await supabase
    .from(table)
    .select()
    .order("id", { ascending: true })
    .range(from, to - 1);

  return data;
};

export const getPagedBookData = async (page: number, size: number, table: string) => {
  let { from, to } = getPagination(page, size);
  const { data, error } = await supabase
    .from(table)
    .select()
    .order("deweynumber", { ascending: true })
    .range(from, to - 1);



  return data;
};

export const getPagedDataByDate = async (page: number, size: number, table: string, dateColumn: string) => {
  let { from, to } = getPagination(page, size);
  const { data } = await supabase
    .from(table)
    .select()
    .order(dateColumn, { ascending: false })
    .order("id", { ascending: false })
    .range(from, to - 1);

  return data;
};

export const getPagedDataByID = async (page: number, size: number, table: string, dateColumn: string) => {
  let { from, to } = getPagination(page, size);
  const { data } = await supabase
    .from(table)
    .select()
    .order("id", { ascending: false })
    .range(from, to - 1);

  return data;
};

export const getTotalPages = async (size: number, table: string) => {
  const { count } = await supabase.from(table).select("*", { count: "exact" });
  let totalPages = 0;
  if(count) {

    totalPages = Math.ceil(count / size);
    return totalPages;
  }
  return totalPages;
};

export const splitQuery = (queryToSplit: string) => {
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

export const getQueriedData = async (table: string, query: string, queryFunction: string) => {
  const andQuery = splitQuery(query);
  if (andQuery) {
    const { data, error } = await supabase.rpc(queryFunction, { keyword: andQuery });
    if(error) {
      alert(error.message);
    }
    let status = "No Data";
    if (!data || data.length === 0) {
      return { data, status };
    }
    return { data: data, status: "ok" };
  }
  return { data: null, status: "None" };
};

export const getSimpleQueriedData = async (table: string, query:string, queryFunction: string) => {
  const { data, error } = await supabase.rpc(queryFunction, { keyword: query });
  if(error) {
    alert(error.message);
  }
  let status = "No Data";
  if(!data || data.length === 0) {
    return { data, status };
  }
  return { data: data, status: 'ok' };
}

export const getItemById = async (table: string, id: string) => {
  const { data } = await supabase.from(table).select().match({ id });
  return data;
};

export const getAllItems = async (table: string) => {
  const { data } = await supabase.from(table).select();

  return data;
};

export const addItemToTable = async (table: string, object: any) => {
  try {
    const { data, error } = await supabase.from(table).insert([object]);
    return { status: "ok", error: "None" };
  } catch (err) {
    return { status: "error", error: err };
  }
};

export const deleteItemFromTable = async (table: string, id: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id: id });
    return { status: "ok", error: "None" };
  } catch (err) {
    return { status: "error", error: err };
  }
};

export const updateItemInTable = async (table: string, id: string, object: any) => {
  try {
    await supabase.from(table).update(object).match({ id: id });
    return { status: "ok", error: "None" };
  } catch (err) {
    return { status: "error", error: err };
  }
};

export const toggleBooleanValue = async (table: string, id: string, column: string) => {
  try {
    const { data } = await supabase
      .from(table)
      .select(column)
      .match({ id: id });
    if(data) {

      const originalValue = data[0][column];
      await supabase
        .from(table)
        .update({ availability: !originalValue })
        .match({ id: id });
      return { status: "ok", error: "None" };
    } else {
      return { status: "error", error: "No Data" }
    }
  } catch (err) {
    return { status: "error", error: err };
  }
};

export const getSignedUrl = async (bucket: string, filename: string) => {
  const { signedURL, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(filename, 60);
  return signedURL;
};


export const getPublicUrl = async (bucket: string, filename: string) => {
  const { publicURL, error } = await supabase.storage
    .from(bucket).getPublicUrl(filename);
  return publicURL;
};

/* AUTH FUNCTIONS */

export const checkAdmin = async (req: Request) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/admin" },
    };
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: user.id });
  let userInfo;
  if (data) {
    userInfo = data[0];
    if (!user || userInfo.role !== "admin") {
      return {
        props: {},
        redirect: { destination: "/" },
      };
    }
  }

  return {
    props: { user, userInfo },
  };
};

export const checkAdminBooleanValue = async (req: Request) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/admin" },
    };
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: user.id });
  let userInfo;
  if (data) {
    userInfo = data[0];
    if (!user || userInfo.role !== "admin") {
      return {
        props: {},
        redirect: { destination: "/" },
      };
    }
  }

  return true;
};

export const checkUser = async (req: Request) => {

  const { user } = await supabase.auth.api.getUserByCookie(req);

  if(!user) {
    return { 
      props: {},
      redirect: {destination: '/'},
    }
  }
  const userInfo = await getUser(user.id);

  return {
    props: { user: userInfo },
  };

  

}

export const getPermissions = async (req: string, permissionSet: PermissionSet) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      props: {},
      redirect: { destination: "/admin" },
    };
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: user.id });
  let userInfo;
  if (data) {
    userInfo = data[0];
    const permitted = userInfo.permissions.some((permission: Permission) =>
      permissionSet.includes(permission)
    );

    if (!user || !permitted) {
      return {
        props: {},
        redirect: { destination: "/admin/admin-dashboard" },
      };
    }
  }

  return {
    props: { user },
  };
};

export const getUser = async (id: string, column?: string) => {

  if(column) {
    const { data, error } = await supabase
      .from("users")
      .select(column)
      .match({ id: id });

    let userInfo;
    if (data) {
      userInfo = data[0];
      return userInfo;
    }
  }

  const { data, error } = await supabase
    .from("users")
    .select()
    .match({ id: id });

  let userInfo;
  if (data) {
    userInfo = data[0];
    return userInfo;
  }
};

export const downloadImage = async (bucket: string, path: string) => {
  try {
    const {data, error} = await supabase.storage.from(bucket).download(path);
    if(error) {
      throw error
    }
    const url = URL.createObjectURL(data!);
    return url;
  } catch (error) {
    console.log("Error downloading image: ", error);
  }
}
