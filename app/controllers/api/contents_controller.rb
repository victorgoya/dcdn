class Api::ContentsController < ApiController
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

  protected

  def content_params
    params.require(:content).permit(:key, :torrent, :title, :info_hash)
  end
end
