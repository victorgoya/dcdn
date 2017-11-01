class Api::ContentsController < ApiController
  before_action :authenticate_user

  expose :contents, -> { Content.all }
  expose :content

  def index
    render json: contents
  end

  def create
    if content.save
      render json: content
    else
      render json: { error: "error" }
    end
  end

  def show
    render json: content
  end

  protected

  def content_params
    params.require(:content).permit(:key, :torrent_key, :title, :info_hash)
  end
end
