"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { useStateRealtime } from "./useStateRealtime";

interface HookConfig<T> {
  transformer: (value: string | null) => T;
  normalizer: (value: T) => string;
}

/**
 * @deprecated this is broken cuz `useStateRealtime` is broken
 * @param key
 * @param defaultValue
 * @param config
 * @returns
 */
export function useUrlParamState<T = string>(
  key: string,
  defaultValue: T,
  config: HookConfig<T>,
) {
  const { transformer, normalizer } = config;

  const pathname = usePathname();
  const urlParams = useSearchParams();
  const router = useRouter();
  const [value, _setValue, getValue] = useStateRealtime(
    transformer(urlParams.get(key)) ?? defaultValue,
  );

  useEffect(() => {
    const paramValue = transformer(urlParams.get(key));
    if (paramValue !== getValue()) {
      _setValue(paramValue);
    }
  }, [key, urlParams, _setValue, getValue, transformer]);

  const setValue = useCallback(
    (newValue: T) => {
      const params = new URLSearchParams(urlParams);
      params.set(key, normalizer(newValue));
      router.push(`${pathname}?${params.toString()}`);
      _setValue(newValue);
    },
    [urlParams, key, normalizer, router, pathname, _setValue],
  );

  return [value, setValue] as const;
}

export function useUrlStringParamState(key: string, defaultValue: string) {
  return useUrlParamState(key, defaultValue, {
    transformer: (value) => value,
    normalizer: (value) => value ?? "",
  });
}
