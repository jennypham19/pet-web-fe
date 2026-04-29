import { PaginatedResponse } from "@/services/base-service";
import { HttpResponse } from "@/types/common";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface FetchParams {
  page: number;
  limit: number;
  selectedDate: any;
}

export const useFetchTaskByDate = <T>(
    fn: (params: FetchParams) => Promise<HttpResponse<PaginatedResponse<T>>>,
    rowsPerPage: number = 10, 
    selectedDate: any
) => {
    const [listData, setListData] = useState<T[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    const latestFetchRef = useRef<number>(0);

    const fetchData = useCallback(async(page: number, limit: number, selectedDate: any) => {
        setLoading(true);
        const fetchId = ++latestFetchRef.current;
        latestFetchRef.current = fetchId;
        try {
            const res = await fn({ page: page, limit: limit, selectedDate: selectedDate });
            // Chặn kết quả cũ ghi đè khi debounce bị overlap
            if (latestFetchRef.current !== fetchId) return;
            const data = res.data?.data as any as T[];
            setListData(data);
            const total = res.data?.total as any as number;
            setTotal(total)
        } catch (error: any) {
            if (latestFetchRef.current !== fetchId) return;
            setError(error.message);
            setListData([]);
            setTotal(0)
        }finally {
            if (latestFetchRef.current === fetchId) {
                setLoading(false);
            }
        }
    }, [fn]);

    // Lần đầu hoặc khi page/status/curator thay đổi -> fetch ngay
    useEffect(() => {
        fetchData(page, rowsPerPage, selectedDate);
    }, [page, rowsPerPage, selectedDate]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }


    return {
        listData,
        loading,
        error,
        handlePageChange,
        total,
        page,
        rowsPerPage,
        fetchData,
        setPage
    }
}