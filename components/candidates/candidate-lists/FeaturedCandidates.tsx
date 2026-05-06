'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CandidateCard from './CandidateCard';
import { api, ApiError } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';
import type { CandidatesFeedResponse, CandidateFeedItem } from '@/types/api';

function CardSkeleton() {
  return (
    <div className="ui-card h-100">
      <div className="ui-card-content">
        <div className="d-flex flex-column align-items-center">
          <Skeleton className="h-20 w-20 rounded-full mb-3" />
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="ui-card-footer justify-content-center">
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}

export default function FeaturedCandidates() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstance = useRef<Swiper | null>(null);
  const [candidates, setCandidates] = useState<CandidateFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch recent/featured candidates
      const response = await api.get<CandidatesFeedResponse>(
        '/homepage/candidates-feed?limit=6'
      );
      setCandidates(response.items);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Kon uitgelichte kandidaten niet laden.');
      }
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  useEffect(() => {
    if (swiperRef.current && candidates.length > 0 && !loading) {
      // Destroy existing swiper if it exists
      if (swiperInstance.current) {
        swiperInstance.current.destroy();
      }

      swiperInstance.current = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: 1,
        spaceBetween: 0,
        loop: candidates.length > 1,
        autoHeight: true,
        pagination: false,
        navigation: {
          nextEl: ".swiper-btn-next",
          prevEl: ".swiper-btn-prev",
        },
      });

      return () => {
        if (swiperInstance.current) {
          swiperInstance.current.destroy();
        }
      };
    }
  }, [candidates, loading]);

  return (
    <aside aria-label="sidebar" className="sidebar sidebar-right">
      <div className="widget w-featured-vacancies widget-sidebar">
        <h3 className="widget-title">Uitgelicht</h3>
        
        {loading ? (
          <CardSkeleton />
        ) : error ? (
          <div className="text-center p-4 text-muted">
            <p className="mb-2">{error}</p>
            <button 
              onClick={fetchCandidates}
              className="crumina-button button--grey button--xs"
            >
              Opnieuw
            </button>
          </div>
        ) : candidates.length === 0 ? (
          <div className="text-center p-4 text-muted">
            Geen uitgelichte kandidaten.
          </div>
        ) : (
          <div className="crumina-module crumina-module-slider navigation-top-right">
            <div className="swiper-btn-wrap">
              <div className="swiper-btn-prev">
                <i className="puzzle-icon fal fa-long-arrow-left"></i>
              </div>
              <div className="swiper-btn-next">
                <i className="puzzle-icon fal fa-long-arrow-right"></i>
              </div>
            </div>
            <div ref={swiperRef} className="swiper-container">
              <div className="swiper-wrapper">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="swiper-slide">
                    <CandidateCard
                      id={candidate.id}
                      displayTitle={candidate.displayTitle}
                      primarySectorName={candidate.primarySectorName || 'Algemeen'}
                      region={candidate.region || undefined}
                      topSkills={[]} // Don't show skills in featured sidebar
                      yearsExperience={candidate.yearsExperience}
                      isFeatured
                      className="h-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="widget w-banner widget-sidebar">
        <div className="banner-header">
          Voor Werkgevers
        </div>
        <div className="banner-content">
          <h4 className="widget-title">Vind de perfecte kandidaat voor jouw vacature</h4>
          <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
            Registreer als werkgever om volledige profielen te bekijken en direct contact op te nemen.
          </p>
          <a href="/register?type=employer" className="crumina-button button--yellow button--m w-100">
            Start als werkgever
          </a>
        </div>
      </div>
    </aside>
  );
}
