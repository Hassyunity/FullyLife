module Api
  module V1
    class SuivisController < ApplicationController
      # GET /api/v1/suivis
      # app/controllers/api/v1/suivis_controller.rb
    def index
        suivis = Suivi.all
        render json: suivis.map { |s|
            {
            id: s.id,
            start_time: s.start_time.strftime("%H:%M:"),
            end_time: s.end_time.strftime("%H:%M:"),
            description: s.description,
            week: s.week,
            day: s.day,
            completed: s.completed,
            remarque: s.remarque
            }
        }
    end

      # GET /api/v1/suivis/:id
      def show
        suivi = Suivi.find(params[:id])
        render json: suivi
      end

      # PATCH /api/v1/suivis/:id
      def update
        suivi = Suivi.find(params[:id])
        if suivi.update(suivi_params)
          render json: suivi
        else
          render json: { errors: suivi.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def suivi_params
        params.require(:suivi).permit(:completed, :remarque)
      end
    end
  end
end
