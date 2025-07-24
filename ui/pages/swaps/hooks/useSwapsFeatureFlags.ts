import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSwapsLivenessAndFeatureFlags } from '../../../ducks/swaps/swaps';

export function useSwapsFeatureFlags() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSwapsLivenessAndFeatureFlags());
  }, [dispatch]);
}
